// janji untuk bayar hutang

const bayarHutang = new Promise((resolve, reject) => {
    const sudahBayarHutang = true;

    if (sudahBayarHutang) {
        resolve("Yeay kamu sudah bayar hutang, kamu keren!");
    } else {
        reject("Hey, kamu sudah bayar hutang!")
    }
});

bayarHutang.then((value) => {
    console.log(value);
});