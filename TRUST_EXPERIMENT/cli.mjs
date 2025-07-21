import { checkbox, confirm, expand, input, select } from '@inquirer/prompts';
import fsExtra from 'fs-extra';
import { parse } from 'json2csv';
import fs from 'fs';
import readline from 'readline';
import path from 'path';


/** -------------------- GLOBALS -------------------- */

let ACTION; // The action the user is attempting to complete
let PARTICIPANT_ID; // The ID of a given participant in the user's database
let OUTPUT_ROOT; // The root in which data is saved
let PARTICIPANT_IDS; // list storing all participant IDS to loop through

const INVALID_ACTION_ERROR = new Error('Invalid action: ' + ACTION);

/** -------------------- MAIN -------------------- */

async function main() {
  // TODO 289: User should be able to pass command line arguments OR inquirer (especially for action)
  //MAO note -> the Participant and ID prompt variables are inside certain cases as they are not
  //needed for downloadAll
  ACTION = await actionPrompt();
  //STUDY_ID = await studyIDPrompt();
  PARTICIPANT_IDS = participantIDAll();

  switch (ACTION) {
    case 'download':
      PARTICIPANT_ID = await participantIDPrompt();
      OUTPUT_ROOT = await savePathPrompt();
      await downloadDataFirebase();
    case 'delete':
      PARTICIPANT_ID = await participantIDPrompt();
      // edit this so we can get the participant ID for each ( use load_ids.R)
      EXPERIMENT_IDS = await experimentIDPrompt();
      await deleteDataFirebase();      
      break;
    case 'downloadAll':
      // don't need to ask for participant ID as we are downloading all
      OUTPUT_ROOT = await savePathPrompt(); // call this before running
      await downloadAllData();
      break;
    default:
      throw INVALID_ACTION_ERROR;
  }
}
main();

/** -------------------- DOWNLOAD ALL ACTION -------------------- */

async function downloadAllData() {
  let overwriteAll = false;
  const rawDataDir = './participant_responses/rawData/'; //contains text files from jatos
  const fileIDMap = getParticipantFilesAndIDs(rawDataDir);

  // loop through participant Ids and download each file
  for (const [file, pID] of Object.entries(fileIDMap)) {    //TODO: add setting where they select which attempt to put in if there is more than 1?
 
      // console.log(trialsRef.exists())

      // Add the trials' data to the experiment's data as "results" array
      // experimentData["results"] = trialsData;

      // Get the path of the file to be saved
      const inputFileTXT =  path.join(rawDataDir, file);
      const outputFileJSON =
        `${OUTPUT_ROOT}/participant_responses/` +
        `prolific/${pID}/${pID}.json`.replaceAll(':', '_'); // (":" are replaced to prevent issues with invalid file names)
      const outputFileCSV =
        `${OUTPUT_ROOT}/participant_responses/` +
        `prolific/${pID}/${pID}.csv`.replaceAll(':', '_'); // (":" are replaced to prevent issues with invalid file names)

      // Determine if the file should be saved
      let shouldDownload;
      if (fsExtra.existsSync(outputFileJSON)) {
        // File exists, check if user wants to overwrite
        const answer = await confirmOverwritePrompt(outputFileJSON, overwriteAll);
        switch (answer) {
          case 'all':
            overwriteAll = true;
            shouldDownload = true;
            break;
          case 'yes':
            shouldDownload = true;
            break;
          default:
            shouldDownload = false;
            break;
        }
      } else {
        // File doesn't exist locally - safe to download
        shouldDownload = true;
      }

      if (overwriteAll || shouldDownload) {
        // Save the session to a unique JSON file.
        try {

        // Read the input text file  
          const rawData = fs.readFileSync(inputFileTXT, 'utf8');
        // should be parsable as JSON
          const data = JSON.parse(rawData);

          // Extract results (assuming trials are in data.results)
          const trials = data;

          // Normalize and flatten survey fields
          const normalized = trials.map(trial => {
            const flat = {};
            for (const key in trial) {
              if (key.startsWith("response.") && trial[key] !== null && typeof trial[key] === 'object') {
                for (const subKey in trial[key]) {
                  flat[subKey] = trial[key][subKey];
                }
              } else if (key.startsWith("response.")) {
                flat[key.replace("response.", "")] = trial[key];
              } else {
                flat[key] = trial[key];
              }
            }
            flat["start_time"] = data["start_time"];
            return flat;
          });


          
          //create directory for participant data if it doesn't exist
          const participantDir = path.dirname(outputFileJSON);
          fsExtra.ensureDirSync(participantDir); // Create the directory if it doesn't exist
          // Save as CSV

          const csv_txt = parse(normalized);
          fs.writeFileSync(outputFileCSV, csv_txt);

          // save data as json
          fsExtra.outputJSONSync(outputFileJSON, data, { spaces: 2 });
          // save data as csv
           console.log(`Data saved successfully: ${outputFileJSON}`);
        } catch (error) {
          console.error(`There was an error saving ${outputFileJSON}`);
          console.error(error);
        }
      } else console.log('Skipping download');
    }
  }
/** -------------------- PROMPTS -------------------- */

/** Prompt the user for the action they are trying to complete */
async function actionPrompt() {
  return await select({
    message: 'What would you like to do?',
    choices: [
      {
        name: 'Download all data',
        value: 'downloadAll',
      },
    ],
  });
}


/** Prompts the user for a file path */
async function savePathPrompt() {
  const invalidMessage = 'Path does not exist';
  return await input({
    message: 'Where would you like to save the data?',
    default: '.',
    validate: async (input) => {
      try {
        const maybePath = fsExtra.statSync(input);
        if (!maybePath.isDirectory()) return invalidMessage;
      } catch (e) {
        return invalidMessage;
      }
      return true;
    },
  });
}

/**Called by download all, turns text file into list of participant IDS to loop through */
// NOTE: not async function because need to get information from other files
// if you want to download all participants at once
function participantIDAll() {
  const PARTICIPANT_IDS = [];
  //const readline = require('readline');
  const filePath = './participant_responses/participant_ids.txt';
  const fileStream = fs.createReadStream(filePath);
  // read participant id csv one line at a time to put them all in a list
  const rl = readline.createInterface({
    input: fileStream,
  });
  rl.on('line', (line) => {
    PARTICIPANT_IDS.push(line);
    //console.log(`Line from file: ${line}`);
  });
  return PARTICIPANT_IDS;
}

function getParticipantFilesAndIDs(rawDataDir) {
  const files = fs.readdirSync(rawDataDir).filter(f => f.endsWith('.txt'));
  const fileIDMap = {};
  for (const file of files) {
    const filePath = path.join(rawDataDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    try {
      const json = JSON.parse(raw);
      // If the file is an array, get the first object's participant_id
      const firstObj = Array.isArray(json) ? json[0] : json;
      const pid = firstObj.participant_id || firstObj.PID;
      if (pid) fileIDMap[file] = pid;
    } catch (e) {
      console.error(`Could not parse ${file}:`, e);
    }
  }
  return fileIDMap;
}