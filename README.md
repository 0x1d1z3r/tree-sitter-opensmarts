# tree-sitter-opensmarts
This is a [Tree-sitter](https://github.com/tree-sitter/tree-sitter) grammar implementing the [OpenSmarts specification](https://github.com/timvdm/OpenSMARTS)
## Notes
The provided grammar includes a [bugfix](https://github.com/timvdm/OpenSMARTS/issues/2), so it differs from the specification.
## How to run
	git clone https://github.com/0x1d1z3r/tree-sitter-opensmarts
 	cd tree-sitter-opensmarts
  
	npm install --save-dev tree-sitter-cli				# install Tree-sitter
	export PATH=$PATH:./node_modules/.bin 				# set $PATH
 
	treesitter generate                   				# generate parser 
 
	tree-sitter build --wasm					# only needed for playground
	treesitter playground                 				# interactive example

## Additional Files
A pure BNF (non LL) grammar for [OpenSmarts](http://opensmiles.org/) is included in *grammar.bnf*

It is modified for use in [BNFPlayground](https://github.com/paul-kline/bnf-playground) without EBNF syntax

