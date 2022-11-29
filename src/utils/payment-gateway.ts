import Xendit = require("xendit-node")
const x = new Xendit({
  secretKey: 'xnd_development_XHUPUtAkC0IJ6FLXoVCBQgSF3oVzcboSnnoDhL5yhBru3YV4W5hu9fvoemoQ9',
});

const { VirtualAcc } = x;
const vaSpecificOptions = {};
const va = new VirtualAcc(vaSpecificOptions);

const resp = async () => {
  const result = await va.createFixedVA({
    externalID: 'va-1475804036622',
    bankCode: 'BNI',
    name: 'Michael Chen',
  })

  console.log(result)
};

resp()