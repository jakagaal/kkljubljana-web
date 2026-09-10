# Kanonična domena je www.kkljubljana.com

Stran je dosegljiva na `kkljubljana.com` in `www.kkljubljana.com`. Izbrali smo
različico z `www` kot kanonično: golo ime se nanjo preusmeri s statusom 307,
`metadataBase` in vsi kanonični naslovi, zemljevid strani, robots.txt in
strukturirani podatki pa uporabljajo `SITE_URL` iz `lib/seo.ts`.

Odločitev je težko povratna. Ko Google indeksira eno različico in nanjo veže
ugled strani, zamenjava pomeni novo preusmeritev, ponovno indeksiranje in
nekajtedenski padec uvrstitev. Zato je `SITE_URL` edina točka resnice: če se
domena kdaj spremeni, se spremeni samo tam.

## Zavrnjena možnost

Golo ime `kkljubljana.com` je krajše in v naslovni vrstici lepše. Zavrnili smo
ga, ker je preusmeritev na Vercelu že postavljena v smeri proti `www` in ker
sprememba smeri v tej fazi ne prinese ničesar, kar bi odtehtalo tveganje
ponovnega indeksiranja.
