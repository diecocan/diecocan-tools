import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

function renderAt(path) {
    render(
        <MemoryRouter initialEntries={[path]}>
            <Navbar />
        </MemoryRouter>
    );
}

describe('Navbar', () => {
    test('renders both nav links', () => {
        renderAt('/');

        expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Owners' })).toBeInTheDocument();
    });

    test('marks Home as active on the root route', () => {
        renderAt('/');

        expect(screen.getByRole('link', { name: 'Home' })).toHaveClass('active');
        expect(screen.getByRole('link', { name: 'Owners' })).not.toHaveClass('active');
    });

    test('marks Owners as active on the /owners route', () => {
        renderAt('/owners');

        expect(screen.getByRole('link', { name: 'Owners' })).toHaveClass('active');
        expect(screen.getByRole('link', { name: 'Home' })).not.toHaveClass('active');
    });
});
