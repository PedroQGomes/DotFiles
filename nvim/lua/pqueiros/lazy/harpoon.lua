return {
    "theprimeagen/harpoon",
    branch = "harpoon2",
    dependencies = { "nvim-lua/plenary.nvim" },
    config = function()
      require("harpoon"):setup()
    end,
    keys = {
      { "<leader>a", function() require("harpoon"):list():add() end, desc = "Add Harpoon file", },
      { "<leader>h", function() local harpoon = require("harpoon") harpoon.ui:toggle_quick_menu(harpoon:list()) end, desc = "Harpoon quick menu", },
      { "<F1>", function() require("harpoon"):list():select(1) end, desc = "Harpoon to file 1", },
      { "<F2>", function() require("harpoon"):list():select(2) end, desc = "Harpoon to file 2", },
      { "<F3>", function() require("harpoon"):list():select(3) end, desc = "Harpoon to file 3", },
      { "<F4>", function() require("harpoon"):list():select(4) end, desc = "Harpoon to file 4", },
      { "<F5>", function() require("harpoon"):list():select(5) end, desc = "Harpoon to file 5", },
    },
}