# Запуск:
-   **1.npm install** — установка пакетов
-   **2.npm run dev** — запуск проекта
-   **перейти по ссылке  Local: http://localhost:5173/** — Открой эту ссылку в браузере



# Auth API (Mock)

Модуль с мок-реализацией API для авторизации и верификации кода.  
Используется для тестирования клиентской логики без реального сервера.  
Все ответы приходят с задержкой `1000ms`.

---

## Методы

### 🔹 `loginApi(payload: LoginPayload): Promise<LoginResponse>`

Поля:

-   **email** — строка
-   **password** — строка

#### Поведение в зависимости от входных данных:

| Email                 | Password   | Ответ                                           |
| --------------------- | ---------- | ----------------------------------------------- |
| `blocked@example.com` | любое      | ❌ Ошибка 403: `User is blocked`                |
| `server@example.com`  | любое      | ❌ Ошибка 500: `Server error`                   |
| `network@example.com` | любое      | ❌ Ошибка 0: `Network error`                    |
| любое                 | ≠ `123456` | ❌ Ошибка 401: `Wrong password or email`        |
| любое                 | `123456`   | ✅ Успех: `{ success: true, userId: "user-1" }` |

---

### 🔹 `verifyCodeApi(payload: VerifyCodePayload): Promise<{ success: boolean }>`

Поля:

-   **userId** — строка
-   **code** — строка

#### Поведение в зависимости от входных данных:

| Code       | Ответ                         |
| ---------- | ----------------------------- |
| ≠ `123456` | ❌ Ошибка 400: `invalid code` |
| `123456`   | ✅ Успех: `{ success: true }` |

---

## Примеры

```ts
// успешный вход
loginApi({ email: "test@example.com", password: "123456" })
    .then((res) => console.log("Success:", res))
    .catch((err) => console.error("Error:", err));

// ошибка: неправильный пароль
loginApi({ email: "test@example.com", password: "wrong" }).catch((err) => console.error("Error:", err));

// успешная проверка кода
verifyCodeApi({ userId: "user-1", code: "123456" }).then((res) => console.log("Code verified:", res));
```
