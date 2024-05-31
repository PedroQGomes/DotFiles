M = {}
M.on_attach = function(_, bufnr)
	local nmap = function(keys, func, desc)
		if desc then
			desc = "LSP: " .. desc
		end

		vim.keymap.set("n", keys, func, { buffer = bufnr, desc = desc })
	end

	nmap("gd", require("telescope.builtin").lsp_definitions, "Goto Definition")
	nmap("gr", require("telescope.builtin").lsp_references, "Goto References")
	nmap("gi", require("telescope.builtin").lsp_implementations, "Goto Implementation")
	nmap("go", require("telescope.builtin").lsp_type_definitions, "Type Definition")
    
    nmap('<leader>rn', vim.lsp.buf.rename, '[R]e[n]ame')

	nmap("<leader>e", vim.diagnostic.open_float, "Show diagnostic [E]rror messages")
    nmap("<leader>q", vim.diagnostic.setloclist, "Open diagnostic [Q]uickfix list")
    nmap("<leader>d", vim.diagnostic.goto_next, "Go to next [D]iagnostic message")

    map('<leader>ca', vim.lsp.buf.code_action, '[C]ode [A]ction')

	nmap("K", vim.lsp.buf.hover, "Hover Documentation")
end

return M
