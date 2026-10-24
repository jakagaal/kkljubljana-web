/**
 * Namenitev dela dohodnine.
 *
 * The club does not collect requests itself. /dohodnina sends people to the
 * form run by the Olympic Committee of Slovenia (OKS), which lists every
 * eligible sports club and forwards the signed request to FURS.
 */

/** As listed in the OKS form and on the FURS list of upravičenci. */
export const RECIPIENT = {
  name: "Karate klub Ljubljana",
  taxNumber: "52316173",
} as const;

export const OKS_FORM_URL = "https://www.olympic.si/podarim/";
