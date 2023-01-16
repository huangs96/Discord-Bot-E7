const ClassWithImmutablePublicAttr = require('./BaseClasses/ClassWithImmutablePublicAttr');
const ProtectedScope = require('./classExtensions/ProtectedScope');

const Constants = (() => {
  const sharedProtected = ProtectedScope();

  return class Constants extends ClassWithImmutablePublicAttr {
    constructor() {
      super();

      this.#setUpImmutableConstants();

      Object.freeze(this);
    }

    #setUpImmutableConstants() {
      const set = sharedProtected(this).DefineImmutablePublic;

      //----------COMMANDS-------------
      set('prefix', '!');
      set('vhelpCommand', 'vhelp');
      set('vhelpText', `This is only usable by lords. Does a look up against sheet created by Aesthetica and Vik to suggest you some comps. \n\nExample command: !Vhelp peira, hwa, violet`);
      set('vPeasant', 'vpeasant');
      set('vPeasantText', `This is used by the peasants. Does a look up against Aesthetica's sheet to suggest you some comps. \n\nExample command: !Vpeasant peira, hwa, violet`);
      set('commands', 'vcommands');
      set('checkWinrate', 'vwinrate');
      set('checkWinrateText', 'Checks your GVG Stats for the season.');
      set('noBuildCommand', `vnobuild`);
      set('noBuildCommandText', `Gets the list of requested comps that we didn't have a build for.`);

      //----------USERS-------------
      set('vcroxId', 'Vcrox#5681');
      set('aestheticaId', 'Aesthetica#4825');
      set('officerRoles', ['Parabellum Officer'
        //, 'Parabellum2 Officer', 'Parabellum3 Officer'
      ]);

      //----------RESPONSES-------------
      set('aestheticaResponse', 'Please use my comp, my ASIAN QUEEN!!!! Step on me! *coom*');
      set('vcroxDenialResponse', 'Find a guild member to sharingan, peasant.');
      set('vcroxDenialResponseGif', 'https://cdn.discordapp.com/attachments/963999915627913226/1027797143932645436/854092979358793759.gif');

      //----------EMBED IMAGE-------------
      set('embedImage', 'https://cdn.discordapp.com/attachments/944305644478038127/1027775971409006683/vcrox-nothingcringe.png');

      set('vcroxSayings', [
        "This comp will win FOR THE ASIAN PUSSY PARADOX!",
        "Use this comp like the pillow, and become a man!",
        "WHAT ARE YOU DOING?! YOU ARE MY WIFE!",
        "I'm scared that if I try it and like it, I become gay.",
        "The offense below is safer than condom with a woman",
        "This offense has stamina, it is a bit black.",
        "Don't forget, this offense has SUPERIOR sperm quality",
        "Fight for the Parabellum Father! For the sperm quality!",
        "Use this comp and the enemy won't be able to hold doggy.",
        "Are you a girl? Nothing cringe btw.",
        "Take this 'couching' and win!",
        "DESTROY AAAAAAAALL",
        "This comp is an amazing breed",
      ]);

      set('nerfedUnits', ['Hwayoung']);
      set('nerfedUnitDisclaimer', '<a:gpb_JustCubes:889923431573880873> <a:gpb_JustCubes:889923431573880873> BEWARE! One of the following comps may not get the job done due to these nerfed units:');

      set('unitNickNames', {
        ras: 'Adventurer Ras',
        aras: 'Adventurer Ras',
        atywin: 'Ambitious Tywin',
        aywin: 'Ambitious Tywin',
        angel: 'Angel of Light Angelica',
        aol: 'Angel of Light Angelica',
        aola: 'Angel of Light Angelica',
        momo: 'Angelic Montmorancy',
        aravi: 'Apocalypse Ravi',
        arby: 'Arbiter Vildred',
        ara: 'Aramintha',
        ads: "Archdemon's Shadow",
        ameru: "Archdemon's Shadow",
        garmin: 'Armin',
        fatcat: 'Assassin Cartuja',
        acidd: 'Assassin Cidd',
        acoli: 'Assassin Coli',
        assblaster: 'Astromancer Elena',
        asslena: 'Astromancer Elena',
        alots: 'Auxiliary Lots',
        bacon: 'Baiken',
        bromann: 'Benevolent Romann',
        bingo: 'Blaze Dingo',
        blingo: 'Blaze Dingo',
        bbk: 'Blood Blade Karin',
        bmh: 'Blood Moon Haste',
        briseria: 'Briar Witch Iseria',
        cmerc: 'Celestial Mercedes',
        cdom: 'Challenger Dominiel',
        cerato: 'Champion Zerato',
        champz: 'Champion Zerato',
        forehead: 'Charlotte',
        rat: 'Choux',
        ccharles: 'Closer Charles',
        clorina: 'Commander Lorina',
        cavel: 'Commander Pavel',
        cilias: 'Conqueror Lilias',
        clilias: 'Conqueror Lilias',
        "c.lilias": 'Conqueror Lilias',
        carmin: 'Crimson Armin',
        dc: 'Dark Corvus',
        dorvus: 'Dark Corvus',
        djb: 'Desert Jewel Basar',
        sandguy: 'Desert Jewel Basar',
        delibet: 'Designer Lilibet',
        dilibet: 'Designer Lilibet',
        ftene: 'Fairytale Tenebria',
        flidica: 'Faithless Lidica',
        fkluri: 'Falconer Kluri',
        fluri: 'Falconer Kluri',
        fcc: 'Fallen Cecilia',
        fmaya: 'Fighter Maya',
        gpurg: 'General Purrgis',
        gp: 'General Purrgis',
        gaither: 'Guider Aither',
        gayther: 'Guider Aither',
        hofine: 'Holiday Yufine',
        hyufine: 'Holiday Yufine',
        ricardo: 'Inferno Khawazu',
        jkise: 'Judge Kise',
        juggs: 'Judge Kise',
        "fire handguy": 'Kawerik',
        gayron: 'Kayron',
        "vcrox's daddy": 'Kayron',
        lrk: 'Last Rider Krau',
        lermia: 'Lionheart Cermia',
        lhc: 'Lionheart Cermia',
        lqc: 'Little Queen Charlotte',
        cancer: 'Lua',
        waifu: 'Lua',
        maken: 'Martial Artist Ken',
        mlken: 'Martial Artist Ken',
        handguy: 'Mediator Kawerik',
        handjob: 'Mediator Kawerik',
        medwick: 'Mediator Kawerik',
        thanos: 'Mediator Kawerik',
        ricky: 'Mediator Kawerik',
        meru: 'Mercedes',
        "moon mommy": 'Moon Bunny Dominiel',
        daddy: 'Mort',
        opsig: 'Operator Sigret',
        pflan: 'Pirate Captain Flan',
        faptain: 'Pirate Captain Flan',
        riolet: 'Remnant Violet',
        rv: 'Remnant Violet',
        "sage balls": 'Sage Baal and Sezan',
        ssb: 'Seaside Bellona',
        srose: 'Shadow Rose',
        ssa: 'Shooting Star Achates',
        sba: 'Silver Blade Aramintha',
        singie: 'Sinful Angelica',
        sangie: 'Sinful Angelica',
        spez: 'Specimen Sez',
        stene: 'Specter Tenebria',
        seline: 'Spirit Eye Celine',
        sharklotte: 'Summer Break Charlotte',
        siseria: 'Summertime Iseria',
        ssi: 'Summertime Iseria',
        sylvian: 'Sylvan Sage Vivian',
        taewho: 'Taeyou',
        tg: 'Taranor Guard',
        tsurin: 'Tempest Surin',
        tmluluca: 'Top Model Luluca',
        tml: 'Top Model Luluca',
        tomoca: 'Top Model Luluca',
        tmcrozet: 'Troublemaker Crozet',
        trozet: 'Troublemaker Crozet',
        weedred: 'Vildred',
        wilk: 'Wanderer Silk',
        wschuri: 'Watcher Schuri',
        zacock: 'Zahhak',
        zagay: 'Zahhak',
        zadog: 'Zahhak',
        zadoggie: 'Zahhak',
        zadoggy: 'Zahhak',
      });
    }
  }
})();

module.exports = new Constants();