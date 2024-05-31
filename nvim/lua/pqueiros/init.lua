require("pqueiros.set")
require("pqueiros.remap")
require("pqueiros.lazy_init")

-- Highlight when yanking text
vim.api.nvim_create_autocmd('TextYankPost', {
    desc = 'Highlight when yanking (copying) text',
    group = vim.api.nvim_create_augroup('HighlightYank', { clear = true }),
    callback = function()
      vim.highlight.on_yank()
    end,
})
