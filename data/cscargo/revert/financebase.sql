-- Revert CsCargo:financebase from pg

BEGIN;

DROP TABLE IF EXISTS finance_cout, finance_compte, finance_don CASCADE;

COMMIT;
