module.exports = grammar({
  name: "OpenSmarts",
  conflicts : ($) => [[$.branched_atom]],
  rules: {
    smarts: ($) => seq($.chain, $.terminator),
    digit: ($) => choice("0", "1", "2", "3", "4", "5", "6", "7", "8", "9"),
    number: ($) => prec.right(1,repeat1($.digit)),
    space: ($) => " ",
    tab: ($) => "\t",
    linefeed: ($) => "\n",
    carriage_return: ($) => "\r",
    end_of_string: ($) => "\x04",
    atom: ($) =>
      choice(
        $.bracket_atom,
        $.aliphatic_organic,
        $.aromatic_organic,
        "*",
        "a",
        "A"
      ),
    aliphatic_organic: ($) =>
      choice("B", "C", "N", "O", "S", "P", "F", "Cl", "Br", "I"),
    aromatic_organic: ($) => choice("b", "c", "n", "o", "s", "p"),
    bracket_atom: ($) => seq("[", prec.right(2,repeat1($.atom_expression)), "]"),
    atom_expression: ($) =>
      choice(
        $.atom_primitive,
        $.recursive_smarts,
        prec.right(seq($.unary_operator, $.atom_expression)),//TODO check if right precedence is the right choice
        prec.right(1,seq($.atom_expression, $.atom_primitive)),
        prec.right(seq($.atom_expression, $.binary_operator, $.atom_expression))
      ),
    recursive_smarts: ($) => seq("$(", $.chain, ")"),
    unary_operator: ($) => "!",
    binary_operator: ($) => choice("&", ";", ","),
    atom_primitive: ($) =>
      choice(
        $.isotope,
        $.symbol,
        $.atomic_number,
        "a",
        "A",
        $.degree,
        $.valence,
        $.connectivity,
        $.total_hcount,
        $.implicit_hcount,
        $.ring_membership,
        $.ring_size,
        $.ring_connectivity,
        $.charge,
        $.chiral,
        $.class_ //alias to class
      ),
    symbol: ($) => choice($.element_symbols, $.aromatic_symbols, "*"),
    element_symbols: ($) =>
      choice(
        "H",
        "He",
        "Li",
        "Be",
        "B",
        "C",
        "N",
        "O",
        "F",
        "Ne",
        "Na",
        "Mg",
        "Al",
        "Si",
        "P",
        "S",
        "Cl",
        "Ar",
        "K",
        "Ca",
        "Sc",
        "Ti",
        "V",
        "Cr",
        "Mn",
        "Fe",
        "Co",
        "Ni",
        "Cu",
        "Zn",
        "Ga",
        "Ge",
        "As",
        "Se",
        "Br",
        "Kr",
        "Rb",
        "Sr",
        "Y",
        "Zr",
        "Nb",
        "Mo",
        "Tc",
        "Ru",
        "Rh",
        "Pd",
        "Ag",
        "Cd",
        "In",
        "Sn",
        "Sb",
        "Te",
        "I",
        "Xe",
        "Cs",
        "Ba",
        "La",
        "Ce",
        "Pr",
        "Nd",
        "Pm",
        "Sm",
        "Eu",
        "Gd",
        "Tb",
        "Dy",
        "Ho",
        "Er",
        "Tm",
        "Yb",
        "Lu",
        "Hf",
        "Ta",
        "W",
        "Re",
        "Os",
        "Ir",
        "Pt",
        "Au",
        "Hg",
        "Tl",
        "Pb",
        "Bi",
        "Po",
        "At",
        "Rn",
        "Fr",
        "Ra",
        "Ac",
        "Th",
        "Pa",
        "U",
        "Np",
        "Pu",
        "Am",
        "Cm",
        "Bk",
        "Cf",
        "Es",
        "Fm",
        "Md",
        "No",
        "Lr"
      ),
    aromatic_symbols: ($) => choice("c", "n", "o", "p", "se", "as"),
    isotope: ($) => $.number,
    atomic_number: ($) => seq("#", $.number),
    degree: ($) => prec.right(1,seq("D", repeat($.number))),
    valence: ($) => prec.right(1,seq("v", repeat($.number))),
    connectivity: ($) => prec.right(1,seq("X", repeat($.number))),
    total_hcount: ($) => prec.right(1,seq("H", repeat($.number))),
    implicit_hcount: ($) => prec.right(1,seq("h", repeat($.number))),
    ring_membership: ($) => prec.right(1,seq("R", repeat($.number))),
    ring_size: ($) => prec.right(1,seq("r", repeat($.number))),
    ring_connectivity: ($) => prec.right(1,seq("x", repeat($.number))),
    charge: ($) =>
      prec.right(1,choice(seq("-", optional($.digit)), seq("+", optional($.digit)))),
    chiral: ($) =>
      choice(
        seq("@", optional("?")),
        seq("@@", optional("?")),
        seq("@TH1", optional("?")),
        seq("@TH2", optional("?")),
        seq("@AL1", optional("?")),
        seq("@AL2", optional("?")),
        seq("@SP1", optional("?")),
        seq("@SP2", optional("?")),
        seq("@SP3", optional("?")),
        seq("@TB1", optional("?")),
        seq("@TB2", optional("?")),
        seq("@TB3", optional("?")),
        seq("@TB4", optional("?")),
        seq("@TB5", optional("?")),
        seq("@TB6", optional("?")),
        seq("@TB7", optional("?")),
        seq("@TB8", optional("?")),
        seq("@TB9", optional("?")),
        seq("@TB10", optional("?")),
        seq("@TB11", optional("?")),
        seq("@TB12", optional("?")),
        seq("@TB13", optional("?")),
        seq("@TB14", optional("?")),
        seq("@TB15", optional("?")),
        seq("@TB16", optional("?")),
        seq("@TB17", optional("?")),
        seq("@TB18", optional("?")),
        seq("@TB19", optional("?")),
        seq("@TB20", optional("?")),
        seq("@OH1", optional("?")),
        seq("@OH2", optional("?")),
        seq("@OH3", optional("?")),
        seq("@OH4", optional("?")),
        seq("@OH5", optional("?")),
        seq("@OH6", optional("?")),
        seq("@OH7", optional("?")),
        seq("@OH8", optional("?")),
        seq("@OH9", optional("?")),
        seq("@OH10", optional("?")),
        seq("@OH11", optional("?")),
        seq("@OH12", optional("?")),
        seq("@OH13", optional("?")),
        seq("@OH14", optional("?")),
        seq("@OH15", optional("?")),
        seq("@OH16", optional("?")),
        seq("@OH17", optional("?")),
        seq("@OH18", optional("?")),
        seq("@OH19", optional("?")),
        seq("@OH20", optional("?")),
        seq("@OH21", optional("?")),
        seq("@OH22", optional("?")),
        seq("@OH23", optional("?")),
        seq("@OH24", optional("?")),
        seq("@OH25", optional("?")),
        seq("@OH26", optional("?")),
        seq("@OH27", optional("?")),
        seq("@OH28", optional("?")),
        seq("@OH29", optional("?")),
        seq("@OH30", optional("?")),
        "@TH?",
        "@SP?",
        "@AL?",
        "@TB?",
        "@OH?"
      ),
    class_: ($) => seq(":", $.number),
    bond_expression: ($) =>
      choice(
        $.bond_primitive,
        seq($.unary_operator, $.bond_primitive),
        seq($.bond_expression, $.bond_primitive),
        seq($.bond_expression, $.binary_operator, $.bond_primitive)
      ),
    bond_primitive: ($) =>
      choice("-", "=", "#", "$", ":", "~", "@", "/", "\\", "/?", "\\?"),
    ringbond: ($) =>
      choice(
        seq(optional($.bond_expression), $.digit),
        seq(optional($.bond_expression), "%", $.digit, $.digit)
      ),
    branched_atom: ($) => seq($.atom, repeat($.ringbond), repeat($.branch)),
    branch: ($) =>
      choice(
        seq("(", $.chain, ")"),
        seq("(", $.bond_expression, $.chain, ")"),
        seq("(", $.dot, $.chain, ")")
      ),
    chain: ($) =>
      choice(
        $.branched_atom,
        seq($.chain, $.branched_atom),
        seq($.chain, $.bond_expression, $.branched_atom),
        seq($.chain, $.dot, $.branched_atom)
      ),
    dot: ($) => ".",
    terminator: ($) =>
      choice($.space, $.tab, $.linefeed, $.carriage_return, $.end_of_string),
  },
});
