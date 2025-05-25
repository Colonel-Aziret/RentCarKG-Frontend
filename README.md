<div align='center'>
  <img src='https://github.com/Colonel-Aziret/RentCarKG-Frontend/blob/912bbe1bd97c3803e029f5d2871d8415c2f5699b/logo.png' width="300"/>
</div>

# RentCarKG — Сервис аренды автомобилей в Кыргызстане

**RentCarKG** — это веб-приложение, разработанное в рамках дипломного проекта, целью которого является упрощение и автоматизация процесса аренды автомобилей в Кыргызстане. Платформа позволяет пользователям арендовать авто онлайн, а владельцам автомобилей — размещать свои машины и получать доход.

---

## 🔎 Назначение проекта

- Упрощение поиска и бронирования автомобилей для туристов, жителей и компаний;
- Возможность владельцам автомобилей сдавать их в аренду;
- Поддержка ролей: клиент, владелец, администратор;
- Многоязычный интерфейс: кыргызский, русский, английский;
- Уведомления по email о ключевых действиях (бронирование, отмена, подтверждение);
- Безопасность: JWT, OAuth2, разграничение прав.

---

## ⚙️ Используемые технологии

### 🔹 Backend

- Java 23
- Spring Boot 3
- Spring Security (JWT, OAuth2)
- Spring Data JPA
- PostgreSQL
- Flyway (миграции)
- SMTP (email-уведомления)

### 🔹 Frontend

- React
- JavaScript
- Tailwind CSS
- React Router
- Context API

### 🔹 Прочее

- REST API (Spring Web)
- Swagger / OpenAPI
- Docker (в планах)
- Mailtrap (SMTP-тестирование)

---

## 📦 Как запустить проект

### 1. Backend

> Требуется: Java 23, PostgreSQL

```bash
git clone https://github.com/Colonel-Aziret/RentCarKG.git
cd RentCarKG
```

Настрой `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/rentcarkg
spring.datasource.username=postgres
spring.datasource.password=your_password
```

Затем:

```bash
./mvnw spring-boot:run
```

### 2. Frontend

> Требуется: Node.js

```bash
cd frontend
npm install
npm start
```

---

## 🧪 Реализованные возможности

- Регистрация / вход (в том числе через Google)
- Фильтрация автомобилей (бренд, цена, трансмиссия)
- Подтверждение бронирований владельцем
- Отмена бронирований с учетом штрафа
- Панель администратора (просмотр пользователей и ролей)
- Email-уведомления на всех этапах
- Многоязычная поддержка (KY / RU / EN)
- Контроль доступа на основе ролей

---

## 🚧 Будущие доработки

- Подключение онлайн-оплаты
- Мобильная версия (PWA / React Native)
- Интеграция с Telegram / WhatsApp
- Уведомления в реальном времени (WebSocket)
- Аналитика и отчётность для владельцев

---

## 📁 ER-диаграмма

Смотри файл `er-diagram.jpg` в корне репозитория.

---

## 🌐 Демо

Проект доступен онлайн по адресу:  
👉 [rentcarkg.netlify.app](https://rentcarkg.netlify.app/)

---

## 🧑‍💻 Автор

- **Разработчик:** Азирет Раманкулов (Aziret Ramankulov)  
- **Научный руководитель:** Dr. Tauheed Khan  
- **Университет:** Ala-Too International University  
- **Email:** aziret.ramankulov.dev@gmail.com

---

Проект создан в рамках дипломной работы, направленной на цифровизацию и автоматизацию локального рынка аренды автомобилей.
