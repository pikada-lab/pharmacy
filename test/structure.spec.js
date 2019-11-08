TestStructureBuilder = {
    pharmacy: {
        id: 1,
        name: 'Профмед',
        adress: 'ул. Кати-Лестьева д 11',
        phone: '+74954445587',
        workingHours: 'с 17 - до 24',
        longitude: 37.616898,
        latitude: 55.755705
    },

    productOrdered1: {
        id: 12,
        productID: 15152422,
        title: 'Tetarubuin',
        image: 'product-154474.jpg',
        isPrescription: true,
        stockType: 1,
        consigmentID: 45884,
        price: 54.55,
        quantity: 3,
        status: 5
    },
    productOrdered2: {
        id: 42,
        productID: 1515555,
        title: 'Гель смазка со вкусом малины',
        image: 'product-4774.jpg',
        isPrescription: false,
        stockType: 2,
        supplierProductID: '4588-2',
        supplierPricelistID: 85,
        price: 348.45,
        quantity: 1,
        status: 3
    },
    adress: {
        street: 'Ул Ульянова-Ленина д. 14',
        building: '14-2',
        floor: 8,
        frontDoor: 2,
        intercom: 'K1425'
    },
    deliveryOrder: {
        id: 31,
        orderId: 998,
        adress: {
            street: 'Ул Ульянова-Ленина д. 14',
            building: '14-2',
            floor: 8,
            frontDoor: 2,
            intercom: 'K1425'
        },
        plannedDate: new Date('2019-10-30T10:50:32.000Z'),
        cost: 3000,
        comment: 'Комментарий к доставке',
        curier: "Ибрагим Давалал-Абад"
    },
    deliveryCart: {
        adress: {
            street: 'Ул Ульянова-Ленина д. 14',
            building: '14-2',
            floor: 8,
            frontDoor: 2,
            intercom: 'K1425'
        },
        plannedDate: new Date('2019-10-30T10:50:32.000Z'),
        cost: 3000,
        comment: 'Комментарий к доставке',
        curier: ''
    },

    userContacts: { phone: '89851111111', name: 'Заказчик' },
    payment: {
        type: 1,
        amount: 8455,
        currency: 'RRU',
        date: new Date('2019-11-07T10:50:32.000Z')
    },

    cartProductShell1: {
        id: 12,
        title: 'Тракторопипсин',
        image: 'product-154474.jpg',
        description: 'Описание товара Тракторопипсина',
        isGNVLS: false,
        isPrescription: true,
    },
    cartProductShelladd: {
        id: 77887,
        title: 'Смертенеобратим',
        image: 'product-666.jpg',
        description: 'Описание товара Смертенеобратим',
        isGNVLS: true,
        isPrescription: false,
    },

    productStock1: {
        id: 12,
        pid: '100200346412',
        scu: 101,
        quantity: 28,
        price: 19.20,
        GDATE: '2020-01-04T00:00:00.000z'
    },

    productStockadd: {
        id: 15,
        pid: '1002003',
        scu: 5,
        quantity: 1500550,
        price: 202,
        GDATE: '2020-01-04T00:00:00.000z'
    },

    cartProduct1: {
       product: null,
       productStock: null,
        quantity: 18
    },
    cartProductadd: {
        product: null,
        productStock: null,
        quantity: 2
    },

    event1: {
        id: 1,
        entityType: 1,
        entityID: 998,
        eventType: 1,
        data: 2,
        date: new Date('2019-11-01T10:50:32.000Z')
    },
    event2: {
        id: 2,
        entityType: 1,
        entityID: 998,
        eventType: 1,
        data: 3,
        date: new Date('2019-11-01T10:55:32.000Z')
    },
    event3: {
        id: 3,
        entityType: 1,
        entityID: 998,
        eventType: 1,
        data: 1,
        date: new Date('2019-11-01T10:55:33.000Z')
    },
    event4: {
        id: 4,
        entityType: 1,
        entityID: 999,
        eventType: 1,
        data: 4,
        date: new Date('2019-11-01T10:55:33.000Z')
    },
    event5: {
        id: 5,
        entityType: 3,
        entityID: 31,
        eventType: 1,
        data: 5,
        date: new Date('2019-11-01T10:55:33.000Z')
    }

}

TestStructureBuilder.cartProduct1.product = TestStructureBuilder.cartProductShell1;
TestStructureBuilder.cartProduct1.productStock = TestStructureBuilder.productStock1;
TestStructureBuilder.cartProductadd.product = TestStructureBuilder.cartProductShelladd;
TestStructureBuilder.cartProductadd.productStock = TestStructureBuilder.productStockadd;
module.exports = TestStructureBuilder
