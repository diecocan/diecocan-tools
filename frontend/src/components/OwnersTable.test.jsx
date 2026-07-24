import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import OwnersTable from './OwnersTable';
import { OWNERS_BASE_URL } from '../constants/constants';

jest.mock('axios');

describe('OwnersTable', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('fetches and displays owners on mount', async () => {
        axios.get.mockResolvedValue({
            data: [{ id: 1, name: 'Alice', isActive: true }],
        });

        render(<OwnersTable />);

        expect(await screen.findByText('Alice')).toBeInTheDocument();
        expect(axios.get).toHaveBeenCalledWith(OWNERS_BASE_URL);
    });

    test('filters owners by name', async () => {
        axios.get.mockResolvedValue({
            data: [
                { id: 1, name: 'Alice', isActive: true },
                { id: 2, name: 'Bob', isActive: true },
            ],
        });
        const user = userEvent.setup();

        render(<OwnersTable />);
        await screen.findByText('Alice');
        await screen.findByText('Bob');

        await user.type(screen.getByPlaceholderText('Filter by name'), 'ali');

        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });

    test('adds a new owner', async () => {
        axios.get.mockResolvedValue({ data: [] });
        axios.post.mockResolvedValue({
            data: { id: 2, name: 'Charlie', isActive: true },
        });
        const user = userEvent.setup();

        render(<OwnersTable />);
        await waitFor(() => expect(axios.get).toHaveBeenCalled());

        await user.type(screen.getByPlaceholderText('New owner name'), 'Charlie');
        await user.click(screen.getByRole('button', { name: /add owner/i }));

        expect(await screen.findByText('Charlie')).toBeInTheDocument();
        expect(axios.post).toHaveBeenCalledWith(OWNERS_BASE_URL, {
            name: 'Charlie',
            isActive: true,
        });
    });

    test('deletes an owner', async () => {
        axios.get.mockResolvedValue({
            data: [{ id: 1, name: 'Alice', isActive: true }],
        });
        axios.delete.mockResolvedValue({});
        const user = userEvent.setup();

        render(<OwnersTable />);
        await screen.findByText('Alice');

        await user.click(screen.getByRole('button', { name: 'Delete' }));

        await waitFor(() => expect(screen.queryByText('Alice')).not.toBeInTheDocument());
        expect(axios.delete).toHaveBeenCalledWith(`${OWNERS_BASE_URL}/1`);
    });

    test('edits an owner', async () => {
        axios.get.mockResolvedValue({
            data: [{ id: 1, name: 'Alice', isActive: true }],
        });
        axios.put.mockResolvedValue({
            data: { id: 1, name: 'Alice Updated', isActive: false },
        });
        const user = userEvent.setup();

        render(<OwnersTable />);
        await screen.findByText('Alice');

        await user.click(screen.getByRole('button', { name: 'Edit' }));

        const nameInput = screen.getByDisplayValue('Alice');
        await user.clear(nameInput);
        await user.type(nameInput, 'Alice Updated');
        await user.click(screen.getByRole('checkbox'));

        await user.click(screen.getByRole('button', { name: 'Save' }));

        expect(await screen.findByText('Alice Updated')).toBeInTheDocument();
        expect(axios.put).toHaveBeenCalledWith(`${OWNERS_BASE_URL}/1`, {
            id: 1,
            name: 'Alice Updated',
            isActive: false,
        });
    });
});
