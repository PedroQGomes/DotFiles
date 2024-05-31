vim.g.mapleader = ' '
vim.g.maplocalleader = ' '

-- Clear search highlight
vim.keymap.set('n', '<Esc>', '<cmd>nohlsearch<CR>')

-- Go to the file explorer 
vim.keymap.set("n", "<leader>fe", vim.cmd.Ex, { desc = 'File explorer' })
