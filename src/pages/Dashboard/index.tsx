import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      // TODO
      await api.get('transactions').then(response => {
        let formattedTransactions: Transaction[] = response.data.transactions;
        formattedTransactions = formattedTransactions.map(transaction => {
          const { id, title, value, type, category, created_at } = transaction;

          const formattedValue = formatValue(Number(value));
          const formattedDate = formatDate(created_at);
          return {
            id,
            title,
            value,
            type,
            category,
            created_at,
            formattedValue,
            formattedDate,
          };
        });
        setTransactions(formattedTransactions);
        setBalance(response.data.balance);
      });
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        {balance && (
          <CardContainer>
            <Card>
              <header>
                <p>Entradas</p>
                <img src={income} alt="Income" />
              </header>
              <h1 data-testid="balance-income">
                {formatValue(Number(balance.income))}
              </h1>
            </Card>
            <Card>
              <header>
                <p>Saídas</p>
                <img src={outcome} alt="Outcome" />
              </header>
              <h1 data-testid="balance-outcome">
                {formatValue(Number(balance.outcome))}
              </h1>
            </Card>
            <Card total>
              <header>
                <p>Total</p>
                <img src={total} alt="Total" />
              </header>
              <h1 data-testid="balance-total">
                {formatValue(Number(balance.total))}
              </h1>
            </Card>
          </CardContainer>
        )}

        {transactions && (
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Data</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map(transaction => {
                  const {
                    id,
                    title,
                    formattedValue,
                    type,
                    formattedDate,
                  } = transaction;
                  return (
                    <tr key={id}>
                      <td className="title">{title}</td>
                      <td className={type}>
                        {`${type === 'outcome' ? '- ' : ''} ${formattedValue}`}
                      </td>
                      <td>{type}</td>
                      <td>{formattedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
