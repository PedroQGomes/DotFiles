vim.g.mapleader = ' '
vim.g.maplocalleader = ' '

-- Clear search highlight
vim.keymap.set('n', '<Esc>', '<cmd>nohlsearch<CR>')

-- Go to the file explorer
vim.keymap.set("n", "<leader>fe", vim.cmd.Ex, { desc = 'File explorer' })

-- move lines up and down
vim.keymap.set("v", "<up>", ":m '<-2<CR>gv=gv")
vim.keymap.set("v", "<down>", ":m '>+1<CR>gv=gv")

-- Paste and keep the OG yank
vim.keymap.set("x", "<leader>p", [["_dP]])

-- make Esc and ctrl C the same
vim.keymap.set("i", "<C-c>", "<Esc>")

-- diagnostic key bindings to go to the next and previous problem
vim.keymap.set("n", "<C-k>", "<cmd>cnext<CR>zz")
vim.keymap.set("n", "<C-j>", "<cmd>cprev<CR>zz")
vim.keymap.set("n", "<leader>k", "<cmd>lnext<CR>zz")
vim.keymap.set("n", "<leader>j", "<cmd>lprev<CR>zz")

-- replace every match in the file
vim.keymap.set("n", "<C-r>", [[:%s/\<<C-r><C-w>\>/<C-r><C-w>/gI<Left><Left><Left>]])

-- Remap Tab in visual mode to indent to the right
vim.keymap.set('v', '<Tab>', '>gv', { noremap = true, silent = true })

-- Remap Shift-Tab in visual mode to indent to the left
vim.api.nvim_set_keymap('v', '<S-Tab>', '<gv', { noremap = true, silent = true })