var ENV = process.env;
var MEM = process.memory();
var s = require("Storage");

g.clear(1);
g.setFont("6x8");
var y = 24, h=8;
g.drawImage(require("heatshrink").decompress(atob("vE4gQZWg//AAI3Zh4dCoAd6wAd64Ad2j4d6l4dcn4dC6Adc+AdYv4dUggHG//kgN//AGB1WkDpkOAwsH/gDBgJ4CTRwdGl6RDl/0gHQgJeMDo2/AgcDIAIkBnAdRgJyCAAQdDlgdRgZPDgbWBDoUcDqMPRYcJgEfoA7Uh9AAgQ1BEgIdBngdRKQIACmBbB6AdB2gdRnoEDyB+C8tbbQVpgNAqOkAwMGyEQDoMB1AIBvgdDPYMC+H//7zBg//+fAA4OAgH//twDoMv/4WB3iyEAAPwHINvTYMAv/A/sC6BmBh/wDoP4gIuBdwayBAAP/DoMH4F4ToQSB+EPJQUOgKmDBgIABhAdFB4L7BgfAAYNwjpKChwJBTIQdDiAdFgHgAYIdDmDaCO4MD9Wq14dM+CdCDoU0nDjChyhBAAIdFsgdTZgaVDmPYLJk0LIodDaIcxcILRDSo80jiVECgUAvgDCmG0YQTRHDoTRBgLRCMwJDBnodDeAMDKoUvAIU/DocD6ELDoKRCAIM/LIcGG4PQUIKCBU4PzDoaEB/p3BFQKKCh9ADoXsKIVVqonCtVBoFQcAUKyFwghdB3IPBCwJZCAQMfEgQAL2AGFgZJBDoZgDABEMWYQJFgLwCkACB/gdLWYMCfoQAE35BEDpkH8EfdgYADl4mDl68BABazBFBA2CgK8CABcBUZP/8kBv58CAC1//4ABUQwASn4dgOxoALl4dC4AdYj4d6h4d+wAd6oAd2g4dCAwQA=")),120,y);
g.setColor(0xFD20);
g.drawString("BANGLEJS.COM",120,y-4);
g.setColor(0xFFFF);
g.drawString("Powered by Espruino",0,y+=4+h);
g.drawString("Board "+ENV.BOARD,0,y+=h);
g.drawString("Version "+ENV.VERSION,0,y+=h);
g.drawString("Commit "+ENV.GIT_COMMIT,0,y+=h);
g.drawString(MEM.total+" JS Variables available",0,y+=h);
g.drawString("Storage: "+(require("Storage").getFree()>>10)+"k free",0,y+=h);
if (ENV.STORAGE) g.drawString("         "+(ENV.STORAGE>>10)+"k total",0,y+=h);
if (ENV.SPIFLASH) g.drawString("SPI Flash: "+(ENV.SPIFLASH>>10)+"k",0,y+=h);
g.drawString("BLE-MAC: "+NRF.getAddress(),0,y+=h);

y+=h;
g.setColor(0x001F);
g.drawString("ALL APP Versions",120,y+=h);
g.setColor(0xFFFF);
y+=h;

function showAllApps() {
  var list = s.list(/\.info$/).filter((a)=> {
    return a;
  }).sort().map((app) => {
    var ret = s.readJSON(app,1)||{};
    ret[''] = app;
    return ret;
  });

  if (list.length > 0) {
    list.reduce((menu, app) => {
      var v = ("object"==typeof app)?app.version:false;
      g.setColor(0xFFFF);
      g.drawString(app.name+": ",0,y+=h);
      g.setColor(0x780F);
      g.drawString((v?"v"+v:"Unknown"),6*(app.name.length+2),y);
    });
  }
}

showAllApps();
g.flip();
