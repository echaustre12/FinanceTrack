-- Financial Track database script

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    phone_number VARCHAR(20) UNIQUE
);

CREATE TABLE payment_method (
    id SMALLSERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,

    CONSTRAINT fk_category_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE financial_period (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status BOOLEAN NOT NULL,
    user_id INTEGER NOT NULL,

    CONSTRAINT fk_period_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE income (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(12,2) NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL,
    period_id INTEGER NOT NULL,
    payment_method_id SMALLINT NOT NULL,

    CONSTRAINT fk_income_period
        FOREIGN KEY (period_id)
        REFERENCES financial_period(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_income_payment_method
        FOREIGN KEY (payment_method_id)
        REFERENCES payment_method(id)
);

CREATE TABLE expense (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(12,2) NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL,

    payment_method_id SMALLINT NOT NULL,
    category_id INTEGER NOT NULL,
    period_id INTEGER NOT NULL,

    CONSTRAINT fk_expense_payment_method
        FOREIGN KEY (payment_method_id)
        REFERENCES payment_method(id),

    CONSTRAINT fk_expense_category
        FOREIGN KEY (category_id)
        REFERENCES category(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_expense_period
        FOREIGN KEY (period_id)
        REFERENCES financial_period(id)
        ON DELETE CASCADE
);

CREATE TABLE recurring_payment (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    day_month SMALLINT NOT NULL,

    category_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,

    CONSTRAINT fk_recurring_category
        FOREIGN KEY (category_id)
        REFERENCES category(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_recurring_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_day_month
        CHECK (day_month BETWEEN 1 AND 31)
);

CREATE TABLE notification (
    id SERIAL PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    date DATE NOT NULL,

    user_id INTEGER NOT NULL,

    CONSTRAINT fk_notification_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE category_budget (
    category_id INTEGER NOT NULL,
    financial_period_id INTEGER NOT NULL,
    budget_limit NUMERIC(12,2) NOT NULL,

    PRIMARY KEY (category_id, financial_period_id),

    CONSTRAINT fk_budget_category
        FOREIGN KEY (category_id)
        REFERENCES category(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_budget_period
        FOREIGN KEY (financial_period_id)
        REFERENCES financial_period(id)
        ON DELETE CASCADE
);