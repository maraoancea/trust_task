/*--------------------------------------------------------------------------------
Dynamic Trust Task written in jspsych by Amrita K. Lamba @ MIT - 2024
--------------------------------------------------------------------------------*/

function compute_trial_earnings(choice, partner_return) {
    let noise;
    function get_p1_outcome() {
        return choice*4;
    }

    function get_p2_outcome() {
        noise = gaussianRand() * partnerStd;
        const finalReturn = Math.max(0, Math.min(0.5, partner_return + noise));
        return Number((choice*4*finalReturn).toFixed(1));
    }

    return [get_p1_outcome(), get_p2_outcome(), partner_return, noise];
}


function gaussianRand() {
  let u=0,v=0;
  while(u===0) u=Math.random();
  while(v===0) v=Math.random();
  return Math.sqrt(-2.0*Math.log(u))*Math.cos(2.0*Math.PI*v);
}