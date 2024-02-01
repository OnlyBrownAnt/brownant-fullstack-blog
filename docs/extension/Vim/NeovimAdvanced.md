# Neovim进阶使用

> 重构[Neovim初体验](https://www.brownant.top/extensionTools/vim/neovim.html)，增加更多具体的配置步骤和介绍，以及分享操作技巧。
>
> 本篇教程基本都是参考官方的基本教程进行的一次总结。
>
> 阅读Reviews的插件教程部分内容前，先阅读Reviews-基础知识，了解基本的术语。

## Docs

- [server_configurations](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md)

## Reviews

### 基础知识

- FQ Tools
  > 安装全程需要打开FQ工具。
- `:Cmd`
  > 在文章中存在大量`:` + `指令`的文本，指的是Vim/Neovim的`Normal`模式下执行命令。
- `~`
  > 在文件路径中，波浪符`~`通常表示用户的主目录（home directory）。它被用作缩写，表示当前登录用户的主目录路径。
- `~/.config/nvim/`
  > `~/.config/nvim` 是 Neovim 编辑器的配置目录。在大多数 Unix-like 系统中，特别是 Linux 和 macOS，Neovim 使用 ~/.config/nvim 目录作为其默认配置目录。这里的波浪符`~`表示用户的主目录。
- `~/.config/nvim/init.lua`
  > init.vim 和 init.lua 是 Neovim 的配置文件，用于自定义和配置 Neovim 编辑器的行为和功能。

### 需求池

> 想要的功能
>
> 但是暂时没能通过插件或者配置实现

1. (已解决)快捷键格式化-neovim通过快捷键处理代码格式化
   > 快捷键出发null-ls插件格式化
2. (已解决)自动代码缩进-neovim不同代码文件编辑处理自动缩进空格数功能，发现LSP在格式化的时候会默认处理代码缩进，js和lua不同空格数。需要统一处理
   > 在neovim配置文件中增加特殊文件的缩进处理和行对齐规则

```lua
vim.api.nvim_exec([[
  autocmd FileType lua,javascript,typescript,vue,shell,json,md setlocal shiftwidth=2 tabstop=2
]], false)

-- 新行对齐当前行
vim.o.autoindent = true
vim.bo.autoindent = true
vim.o.smartindent = true
```

3. neovim的telescope快捷键配置。
4. Lsp功能扩展-代码函数方法和变量等支持跨文件跳转查询

### 基础工具

> 插件运行环境和基础的提高效率的工具, 这里只介绍Mac通过HomeBrew的安装方式，Windows/Linux安装请查看官方文档。

- [neovim](https://neovim.io/)
  > 必选

```shell
brew install neovim
```

- [lua](https://www.lua.org/)
  > 必选

```shell
brew install lua
```

- [tmux](https://github.com/tmux/tmux/wiki)
  > 可选

```shell
brew install tmux
```

### 插件功能归纳

> 这里的功能归纳并不完全指插件专精于某个功能，而是个人日常使用中关于插件功能的侧重功能进行归纳。

```text
- 插件管理
    1. packer.nvum
- LSP Server
    - LSP服务管理
        1. lsp-config.nvim
        2. mason.nvim
    - LSP功能扩展
        1. nvim-cmp.nvim
- 搜索功能
    1. Telescope.nvim
- 代码高亮
    1. nvim-treesitter
- 代码格式化
    1. null-ls.nvim
```

### 插件教程

> 插件安装之前需要先安装基础工具和运行环境
>
> 插件的安装是有顺序，教程也是按照安装顺序进行介绍的。
>
> `Packer配置文件路径`请参考Packer.nvim插件配置中设置的配置文件路径。

#### pakcer.nvim

> [use-package inspired plugin/package management for Neovim.](https://neovimcraft.com/plugin/wbthomason/packer.nvim/index.html)

##### 安装和配置

1. Packer配置文件路径

```text
~/.config/nvim/lua/plugins.lua
```

2. Packer配置文件内容

```lua
-- This file can be loaded by calling `lua require('plugins')` from your init.vim

-- Only required if you have packer configured as `opt`
vim.cmd [[packadd packer.nvim]]

return require('packer').startup(function(use)
  -- Packer can manage itself
  use {'wbthomason/packer.nvim'}

  -- other plugins

  end)
```

3. Packer配置启用命令

```shell
:PackerInstall
```

##### 常用命令

```shell
-- You must run this or `PackerSync` whenever you make changes to your plugin configuration
-- Regenerate compiled loader file
:PackerCompile

-- Remove any disabled or unused plugins
:PackerClean

-- Clean, then install missing plugins
:PackerInstall

-- Clean, then update and install plugins
-- supports the `--preview` flag as an optional first argument to preview updates
:PackerUpdate

-- Perform `PackerUpdate` and then `PackerCompile`
-- supports the `--preview` flag as an optional first argument to preview updates
:PackerSync

-- Show list of installed plugins
:PackerStatus

-- Loads opt plugin immediately
:PackerLoad completion-nvim ale
```

##### 常用命令流程

- 删除插件

1. 修改Packer配置文件
2. 执行`:PackerClean`

- 新增插件

1. 修改Packer配置文件
2. 执行`:PackerInstall`

- 更新插件(插件版本、插件配置等)

```shell
# 依次执行
`:PackerUpdate`
`:PackerSync`
`:PackerCompile`
```

- 查看插件状态

1. 执行`:PackerStatus`

#### Telescope.nvim

> [telescope.nvim是一个高度可扩展的列表模糊查找器。基于核心的最新强大功能构建neovim。Telescope 以模块化为中心，可以轻松定制。社区驱动的内置选择器、分类器和 预览器。](https://neovimcraft.com/plugin/nvim-telescope/telescope.nvim/index.html)

##### 安装和配置

1. 安装支持库
   > 这里介绍的是Mac下使用Homebrew工具安装支持库。Windows/Linux安装相关库，请到具体官网查看教程。

- [BurntSushi/ripgrep](https://github.com/BurntSushi/ripgrep)

```shell
brew install ripgrep
```

- [sharkdp/fd](https://github.com/sharkdp/fd)

```shell
brew install fd
```

2. 在Packer配置文件中增加配置

```lua
use {
    'nvim-telescope/telescope.nvim', tag = '0.1.2',
	requires = { { 'nvim-lua/plenary.nvim' } }
}
```

3. 启动Packer新增插件流程
   > 执行`:PackerInstall`

#### nvim-treesitter

> 提供一种简单易用的方法来进行代码解析以及高亮显示。

##### 安装和配置

1. 在Packer配置文件中增加配置

```lua
use {
		'nvim-treesitter/nvim-treesitter',
		run = function()
			local ts_update = require('nvim-treesitter.install').update({ with_sync = true })
			ts_update()
		end,
}
```

2. 增加nvim-treesitter配置文件

- 配置文件路径

```text
~/.config/nvim/lua/plugin-config/nvim-treesitter.lua
```

- 配置文件内容

```lua
local treesitter = require("nvim-treesitter.configs")
treesitter.setup({
	-- install language parser
	-- :TSInstallInfo
	ensure_installed = {
		"bash",
		"vim",
		"lua",
		"c",
		"cpp",
		"cmake",
		"go",
		"python",
		"javascript",
		"typescript",
		"tsx",
		"html",
		"css",
		"markdown",
		"json",
		"yaml",
        "vue"
	},
	-- ensure_installed = "maintained",
	highlight = {
		enable = true,
		additional_vim_regex_highlighting = false,
	}
})
```

3. 在init.lua配置文件中引入nvim-treesitter配置

```lua
require('plugin-config.nvim-treesitter')
```

4. 启动Packer新增插件流程
   > 执行`:PackerInstall`

#### lsp-config.nvim

> [Nvim LSP 客户端的配置](https://neovimcraft.com/plugin/neovim/nvim-lspconfig/index.html)

##### 安装和配置

1. 在Packer配置文件中增加配置

```lua
use { "williamboman/mason-lspconfig.nvim" }
```

2. 增加server_configurations配置文件
   > 该配置文件主要是用于声明需要配置的lsp server，便于lsp-config.nvim以及mason.nvim这类Lsp插件使用。
   >
   > lsp server的声明需要严格符合[server_configurations](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md)

- 配置文件路径

```text
~/.config/nvim/lua/plugin-config/lsp/server_configurations.lua
```

- 配置文件内容

```lua
local servers = {
	"lua_ls",
	"tsserver",
	"cssmodules_ls",
	"emmet_ls",
	"html",
	"volar",
	"java_language_server"

}
return servers;
```

3. 增加lsp-config.nvim配置文件

- 配置文件路径

```text
~/.config/nvim/lua/plugin-config/lsp/lspconfig.lua
```

- 配置文件内容

```lua
-- we'll need to call lspconfig to pass our server to the native neovim lspconfig.
local servers = require('plugin-config.lsp.server-configurations');
local lspconfig_status, lspconfig = pcall(require, "lspconfig")
if not lspconfig_status then
	return
end

local opts = {}
-- loop through the servers
for _, server in pairs(servers) do
	opts = {
		-- getting "on_attach" and capabilities from handlers:
	}

	-- get the server name
	server = vim.split(server, "@")[1]

	-- pass them to lspconfig
	lspconfig[server].setup(opts)
end
```

4. 在init.lua配置文件中引入lsp-config配置

```lua
require('plugin-config.lsp.lspconfig')

```

5. 启动Packer新增插件流程
   > 执行`:PackerInstall`

#### mason.nvim

> [mason.nvim是一个 Neovim 插件，可通过单个界面轻松管理外部编辑器工具，例如 LSP 服务器、DAP 服务器、linter 和格式化程序](https://neovimcraft.com/plugin/williamboman/mason.nvim/index.html)
>
> 该插件教程中中包含了mason-lspconfig.nvim插件和配置, 并且要求lsp-config.nvim配置之后才能安装配置该插件。

##### 配置和安装

1. 在Packer配置文件中增加配置

```lua
use { "williamboman/mason.nvim" }
use { "williamboman/mason-lspconfig.nvim" }
```

2. 增加mason.nvim和mason-lspconfig配置文件
   > 两个插件配置都包含在mason配置文件中

- 配置文件路径

```text
~/.config/nvim/lua/plugin-config/lsp/mason.lua
```

- 配置文件内容

```lua
-- protected calls
local masonStatus, mason = pcall(require, "mason")
if not masonStatus then
	return
end

local masonLspStatus, mason_lspconfig = pcall(require, "mason-lspconfig")
if not masonLspStatus then
	return
end

local servers = require('plugin-config.lsp.server-configurations')

-- Here we declare which settings to pass to the mason, and also ensure servers are installed. If not, they will be installed automatically.
local settings = {
	ui = {
		border = "rounded",
		icons = {
			package_installed = "◍",
			package_pending = "◍",
			package_uninstalled = "◍",
		},
	},
	log_level = vim.log.levels.INFO,
	max_concurrent_installers = 4,
}

mason.setup(settings)
mason_lspconfig.setup {
	ensure_installed = servers,
	automatic_installation = true,
}
```

3. 在init.lua配置文件中引入mason.nvim和mason-lspconfig配置

```lua
require('plugin-config.lsp.mason')
```

4. 启动Packer新增插件流程
   > 执行`:PackerInstall`

##### 常用命令

```shell
:Mason - opens a graphical status window
:MasonUpdate - updates all managed registries
:MasonInstall <package> ... - installs/re-installs the provided packages
:MasonUninstall <package> ... - uninstalls the provided packages
:MasonUninstallAll - uninstalls all packages
:MasonLog - opens the mason.nvim log file in a new tab window
```

##### 常用命令流程

- 新增/删除LSP Server

1. 在server_configurations配置文件新增/删除server配置

   > 在servers变量中配置

2. 更新mason的配置

   > 执行`MasonUpdate`

3. 查看mason安装情况
   > 执行`:Mason`

#### nvim-cmp.nvim

> [用 Lua 编写的 neovim 补全引擎插件](https://neovimcraft.com/plugin/hrsh7th/nvim-cmp/index.html)
>
> 安装的插件比较多，都是必要的支持插件。而且需要lsp-config插件配置配合修改。

##### 安装和配置

1. 在Packer配置文件中增加配置

```lua
use { "hrsh7th/nvim-cmp" }
use { "hrsh7th/cmp-nvim-lsp" }
use { "hrsh7th/cmp-buffer" }
use { "hrsh7th/cmp-path" }
use { "hrsh7th/cmp-cmdline" }
use { 'hrsh7th/cmp-vsnip' }
use { 'hrsh7th/vim-vsnip' }
```

2. 增加nvim-cmp配置文件

- 配置文件路径

```text
~/.config/nvim/lua/plugin-config/nvim-cmp.lua
```

- 配置文件内容

```lua
-- Set up nvim-cmp.
local cmp = require'cmp'

cmp.setup({
  snippet = {
    -- REQUIRED - you must specify a snippet engine
    expand = function(args)
      vim.fn["vsnip#anonymous"](args.body) -- For `vsnip` users.
      -- require('luasnip').lsp_expand(args.body) -- For `luasnip` users.
      -- require('snippy').expand_snippet(args.body) -- For `snippy` users.
      -- vim.fn["UltiSnips#Anon"](args.body) -- For `ultisnips` users.
    end,
  },
  window = {
    -- completion = cmp.config.window.bordered(),
    -- documentation = cmp.config.window.bordered(),
  },
  mapping = cmp.mapping.preset.insert({
    ['<C-b>'] = cmp.mapping.scroll_docs(-4),
    ['<C-f>'] = cmp.mapping.scroll_docs(4),
    ['<C-Space>'] = cmp.mapping.complete(),
    ['<C-e>'] = cmp.mapping.abort(),
    ['<CR>'] = cmp.mapping.confirm({ select = true }), -- Accept currently selected item. Set `select` to `false` to only confirm explicitly selected items.
  }),
  sources = cmp.config.sources({
    { name = 'nvim_lsp' },
    { name = 'vsnip' }, -- For vsnip users.
    -- { name = 'luasnip' }, -- For luasnip users.
    -- { name = 'ultisnips' }, -- For ultisnips users.
    -- { name = 'snippy' }, -- For snippy users.
  }, {
    { name = 'buffer' },
  })
})

-- Set configuration for specific filetype.
cmp.setup.filetype('gitcommit', {
  sources = cmp.config.sources({
    { name = 'git' }, -- You can specify the `git` source if [you were installed it](https://github.com/petertriho/cmp-git).
  }, {
    { name = 'buffer' },
  })
})

-- Use buffer source for `/` and `?` (if you enabled `native_menu`, this won't work anymore).
cmp.setup.cmdline({ '/', '?' }, {
  mapping = cmp.mapping.preset.cmdline(),
  sources = {
    { name = 'buffer' }
  }
})

-- Use cmdline & path source for ':' (if you enabled `native_menu`, this won't work anymore).
cmp.setup.cmdline(':', {
  mapping = cmp.mapping.preset.cmdline(),
  sources = cmp.config.sources({
    { name = 'path' }
  }, {
    { name = 'cmdline' }
  })
})
```

3. 修改lspconfig插件配置，引入cmp-nvim-lsp插件配置

```lua
-- we'll need to call lspconfig to pass our server to the native neovim lspconfig.
local servers = require('plugin-config.lsp.server-configurations');
local lspconfig_status, lspconfig = pcall(require, "lspconfig")
if not lspconfig_status then
	return
end

-- get cmp_nvim_lsp opts.
local cmp_nvim_lsp_status, cmp_nvim_lsp = pcall(require, "cmp_nvim_lsp")
if not cmp_nvim_lsp_status then
 	return
end
local capabilities = cmp_nvim_lsp.default_capabilities()

-- loop through the servers
local opts = {}
for _, server in pairs(servers) do
	opts = {
		-- getting "on_attach" and capabilities from handlers:
		capabilities = capabilities,
	}

	-- get the server name
	server = vim.split(server, "@")[1]

	-- pass them to lspconfig
	lspconfig[server].setup(opts)
end
```

4. 在init.lua配置文件中引入nvim-cmp配置

```lua
require('plugin-config.nvim-cmp')
```

5. 启动Packer新增插件流程
   >

#### null-ls.nvim

> [使用 Neovim 作为语言服务器，通过 Lua 填充 LSP 诊断、代码操作等。](https://github.com/jose-elias-alvarez/null-ls.nvim)
>
> 最常用到的就是其格式化代码功能，这里教程主要介绍如何通过快捷键利用null-ls.nvim进行代码格式化。

##### 安装和配置

1. 在Packer配置文件中增加配置

```lua
use { "jose-elias-alvarez/null-ls.nvim" }
```

2. 增加null-ls配置文件

- 配置文件路径

```text
~/.config/nvim/lua/plugin-config/lsp/null-ls.lua
```

- 配置文件内容

```lua
local null_ls_status, null_ls = pcall(require, "null-ls")
if not null_ls_status then
    return
end

local augroup = vim.api.nvim_create_augroup("LspFormatting", {})
null_ls.setup({
    sources = {
        null_ls.builtins.formatting.prettier,
        null_ls.builtins.formatting.google_java_format,
        null_ls.builtins.diagnostics.eslint,
        null_ls.builtins.completion.spell,
    },
    -- you can reuse a shared lspconfig on_attach callback here
    on_attach = function(client, bufnr)
        if client.supports_method("textDocument/formatting") then
            vim.api.nvim_clear_autocmds({ group = augroup, buffer = bufnr })
            vim.api.nvim_create_autocmd("BufWritePre", {
                group = augroup,
                buffer = bufnr,
                callback = function()
                    -- on 0.8, you should use vim.lsp.buf.format({ bufnr = bufnr }) instead
                    -- on later neovim version, you should use vim.lsp.buf.format({ async = false }) instead
		            -- vim.lsp.buf.format()
		            -- vim.lsp.buf.formatting_sync()
                end,
            })
        end
    end,
})
```

3. 在init.lua配置文件中引入null-ls配置

```lua
require('plugin-config.lsp.null-ls')
```

4. 在init.lua配置文件中增加快捷键配置配置
   > MAC Control-f格式化

```lua
vim.api.nvim_set_keymap('n', '<C-f>', ':lua vim.lsp.buf.format()<CR>', { noremap = true, silent = true })
```

5. 启动Packer新增插件流程
   > 执行`:PackerInstall`
