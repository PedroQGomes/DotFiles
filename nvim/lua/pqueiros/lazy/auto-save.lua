return {
  "Pocco81/auto-save.nvim",
  event = { "User AstroFile", "InsertEnter" },
  opts = {
    debounce_delay = 1000,
    execution_message = {
        message = function()
        return ""
      end,
    },
  condition = function(buf)
    local fn = vim.fn
    local utils = require "auto-save.utils.data"
    if utils.not_in(fn.getbufvar(buf, "&filetype"), { "harpoon" }) then
      return true
    end
    return false
  end,
  },
}