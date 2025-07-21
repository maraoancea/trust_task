# trust_task_mengyun

TRUST TASK CREATED BY MENGYUN YIN
MARA OANCEA EDITS TO DOWNLOAD DATA : participant_responses and cli.mjs

INSTRUCTIONS TO DOWNLOAD DATA:
DOWNLOADING PARTICIPANT DATA
1. Filter participants in jatos as state:FINISHED, type: GENERAL_MULTIPLE, and start_time to whatever is needed
2. Click the export_results and download all selected as .txt files (if this is the only available option) into TRUST_EXPERIMENT/participant_responses/rawData
3. Then, open terminal at TRUST_EXPERIMENT and run node cli.mjs 
4. Should be given prompts- enter DOWNLOAD ALL
5. Then when asked where to save, press enter and it will save in participant_responses/prolific/
6. This will output a folder for each participant, each containing a json version of their data and csv version
