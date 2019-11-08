# Бизнес логика работы с аптекой

В проект включены

## Товары
url api ProductsService
```
GET: {URL_API}/v1/products/{[0-9]+}
```
возвращает товар по номеру

---
```
GET: {URL_API}/v1/products/{[0-9,]+}?arrayId
```
возвращает товары по номеру
Метод необходим для актуализации товаров в корзине.

---

## Заказы
```
GET: {URL_API}/v1/orders/{[0-9]+}
```
возвращает товар по номеру

---
```
POST: {URL_API}/v1/orders/
```
отправляет заказ на сервер

---
```
GET: {URL_API}/v1/orders/ready-date
```
возвращает предварительную дату готовности заказа

---
```
POST: ${URL_API}/v1/orders/adress
```
возвращает структуру delivery заказа

---
```
POST: ${URL_API}/v1/orders/valid
```
валидирует заказ

---
```
${URL_API}/v1/orders
```
Получить список заказов пользователя.

---
```
${URL_API}/v1/orders/${id}
```
Получить полную информацию о заказе номер id

---
```
${URL_API}/v1/orders/${id}/cancel
```
Отменить если возможно заказ номер id
 
---

## Поиск
```
GET: ${URL_API}/v1/products/hints/${part}
```
получить подсказки по строке поиска

---
```
GET: ${URL_API}/v1/products/search/${text}&page=${page}&items=${items}
```
получить продукты по тексту начиная со страницы page
 
---


## Настройки
```
GET: ${URL_API}/v1/settings/
```
получить  настройки клиента в которых хранится текущая аптека, данные по рекламе и настройки поведения клиента

---
```
GET: `${URL_API}/v1/settings/pharmacies`
```
получить данные всех аптек для смены аптеки - выбора аптеки из списка 

---
```
POST: `${URL_API}/v1/settings/authorization`
```

Выполняется 1 раз при подтверждении авторизации в терминале или при первом заходе на устройстве. 
Запрос регистрируется на сервере и возвращает вечный ( на 5 лет) токен JWT с маской прав для работы с основными функциями (заказов, поиска, товаров и т.п.)

Структура токена хранит номер терминала и тип токена.

@property type - "terminale" | "web" - указывает что мы регистрируем
 
---
 

Проект строиться на базе классов и сервисов, контроллер спускается по средствам интерфейса сервиса.

 