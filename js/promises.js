// import Printer from '../lib/Printer';
(() => {
    const printer = new Printer('promises');
    const { print } = printer;

    print('start init a');

    const a = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
            print('a resolved');
        }, 1000);
        print('1');
    });

    const a2 = () => new Promise(async (resolve, reject) => {
        await a();
        print('a resolved in a2');
        resolve();
    });

    const b = async () => {
        await a2();
        print('a2 resolved in b')
        setTimeout(async () => {
            print('b setTimeout invoked');
        }, 1000);
        return 10;
    }

    const c = async () => {
        const z = await b();
        print(`b resolved, and b return ${z}`);
    }

    c();

    print('-1');
})();