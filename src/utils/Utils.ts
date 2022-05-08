import moment from 'moment'
export const cpfMask = (value: any) => {
    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export const cepMask = (value: any) => {

    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export const telefoneMask = (value: any) => {
    var r = value.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}


export const telefoneCelularMask = (value: any) => {
    var r = value.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}


export const apenasNumeros = (value: any) => {
    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
}

export const parseData = (value: any) => {
    return moment(value).format('DD/MM/YYYY'); // substitui qualquer caracter que nao seja numero por nada
}


export const maskAltura = (value: any) => {

    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{1})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(.\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export const maskAnoChegado = (value: any) => {

    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{4})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}


export const estados = [

    {
        label: "Selecione",
        value: "",
    },
    {
        label: "Acre",
        value: "AC",
    },
    {
        label: "Alagoas",
        value: "AL",
    },
    {
        label: "Amapá",
        value: "AP",
    },
    {
        label: "Amazonas",
        value: "AM",
    },
    {
        label: "Bahia",
        value: "BA",
    },
    {
        label: "Ceará",
        value: "CE",
    },
    {
        label: "Distrito Federal",
        value: "DF",
    },
    {
        label: "EspÍrito Santo",
        value: "ES",
    },
    {
        label: "Goiás",
        value: "GO",
    },
    {
        label: "Maranhão",
        value: "MA",
    },
    {
        label: "Mato Grosso",
        value: "MT",
    },
    {
        label: "Mato Grosso do Sul",
        value: "MS",
    },
    {
        label: "Minas Gerais",
        value: "MG",
    },
    {
        label: "Pará",
        value: "PA",
    },
    {
        label: "Paraíba",
        value: "PB",
    },
    {
        label: "Paraná",
        value: "PR",
    },
    {
        label: "Permanbuco",
        value: "PE",
    },
    {
        label: "Piauí",
        value: "PI",
    },
    {
        label: "Rio de Janeiro",
        value: "RJ",
    },
    {
        label: "Rio Grande do Norte",
        value: "RN",
    },
    {
        label: "Rio Grande do Sul",
        value: "RS",
    },
    {
        label: "Rondônia",
        value: "RO",
    },
    {
        label: "Roraima",
        value: "RR",
    },
    {
        label: "Santa Catarina",
        value: "SC",
    },
    {
        label: "São Paulo",
        value: "SP",
    },
    {
        label: "Sergipe",
        value: "SE",
    },
    {
        label: "Tocantins",
        value: "TO",
    },

];


export const verificaCampoListagem = (value: any) => {
    if (value instanceof Date) {
        console.log(value + ' é data')
    }
}

export default {
    cpfMask,
    cepMask,
    telefoneMask,
    telefoneCelularMask,
    verificaCampoListagem,
    apenasNumeros,
    maskAltura,
    maskAnoChegado,
    estados,
    parseData
};