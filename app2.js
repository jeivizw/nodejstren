

const registros = [];
let nextId = 1;
const JORNADA_NORMAL_MIN = 8 * 60; 


const pad = n => String(n).padStart(2, '0');

const formatTime = (date) => 
    `${pad(date.getDate())}/${pad(date.getMonth() + 1)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;

const minToHour = (minTotal) => {
    if (minTotal < 0) return `-${minToHour(-minTotal)}`;
    const h = Math.floor(minTotal / 60);
    const m = Math.floor(minTotal % 60);
    return `${pad(h)}:${pad(m)}`;
};


function registrar(nomeFuncionario, tipo) {
    const agora = new Date();
    registros.push({
        id: nextId++,
        funcionario: nomeFuncionario,
        tipo: tipo.toUpperCase(),
        hora: agora
    });
    console.log(`\n✅ Ponto registrado: ${nomeFuncionario} | ${tipo.toUpperCase()} em ${formatTime(agora)}`);
}

function calcularJornada(nomeFuncionario, dataStr) {
    const diaRegistros = registros
        .filter(r => r.funcionario === nomeFuncionario && formatTime(r.hora).startsWith(dataStr))
        .sort((a, b) => a.hora - b.hora);

    if (diaRegistros.length < 2) {
        console.log(`\n⚠️ ${nomeFuncionario} em ${dataStr}: Não há registros suficientes para cálculo.`);
        return;
    }

    const entrada = diaRegistros[0].hora;
    const saida = diaRegistros[diaRegistros.length - 1].hora;

    const duracaoMin = (saida - entrada) / (1000 * 60);

    const normaisMin = Math.min(duracaoMin, JORNADA_NORMAL_MIN);
    const extrasMin = Math.max(0, duracaoMin - JORNADA_NORMAL_MIN);

    console.log('\n--- JORNADA DO DIA ---');
    console.log(`Func: ${nomeFuncionario} | Data: ${dataStr}`);
    console.log(`Entrada: ${formatTime(entrada)} | Saída: ${formatTime(saida)}`);
    console.log('----------------------');
    console.log(`Total Trabalhado:\t${minToHour(duracaoMin)}`);
    console.log(`Horas Normais (8h):\t${minToHour(normaisMin)}`);
    console.log(`Horas Extras:\t\t${minToHour(extrasMin)}`);
}



console.log('*** SISTEMA DE PONTO ELETRÔNICO (SLIM) ***');
console.log(`Jornada padrão: ${minToHour(JORNADA_NORMAL_MIN)}.`);

const hoje = new Date();
const diaDeHoje = `${pad(hoje.getDate())}/${pad(hoje.getMonth() + 1)}`;


const h8 = new Date(hoje.setHours(8, 0, 0, 0));
const h18_30 = new Date(hoje.setHours(18, 30, 0, 0));

registrar("Alice Silva", "ENTRADA", h8);
registrar("Alice Silva", "SAIDA", h18_30);
calcularJornada("Alice Silva", diaDeHoje);


const h9 = new Date(hoje.setHours(9, 0, 0, 0));
const h16 = new Date(hoje.setHours(16, 0, 0, 0));

registrar("Bruno Souza", "ENTRADA", h9);
registrar("Bruno Souza", "SAIDA", h16);
calcularJornada("Bruno Souza", diaDeHoje);


calcularJornada("Carlos", diaDeHoje);