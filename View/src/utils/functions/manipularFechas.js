const monthThirtyOne = [
  {
    numberMonth: 1,
    isThirtyOne: true,
    isThirty: false,
  },
  {
    numberMonth: 2,
    isThirtyOne: false,
    isThirty: false,
  },
  {
    numberMonth: 3,
    isThirtyOne: true,
    isThirty: false,
  },
  {
    numberMonth: 4,
    isThirtyOne: false,
    isThirty: true,
  },
  {
    numberMonth: 5,
    isThirtyOne: true,
    isThirty: false,
  },
  {
    numberMonth: 6,
    isThirtyOne: false,
    isThirty: true,
  },
  {
    numberMonth: 7,
    isThirtyOne: true,
    isThirty: false,
  },
  {
    numberMonth: 8,
    isThirtyOne: true,
    isThirty: false,
  },
  {
    numberMonth: 9,
    isThirtyOne: false,
    isThirty: true,
  },
  {
    numberMonth: 10,
    isThirtyOne: true,
    isThirty: false,
  },
  {
    numberMonth: 11,
    isThirtyOne: true,
    isThirty: false,
  },
  {
    numberMonth: 12,
    isThirtyOne: true,
    isThirty: false,
  },
];
function generarFechaSiguiente(days, months, years) {
  let day = parseInt(days);
  let month = parseInt(months);
  let year = parseInt(years);
  if (day + 7 > 31 && month == 12) {
    year += 1;
    if (monthThirtyOne[month - 1].isThirtyOne) {
      if (day + 7 > 31) {
        month += 1;
        day = day + 7 - 31;
      } else {
        day += 7;
      }
    } else {
      if (day + 7 > 30) {
        month += 1;
        day = day + 7 - 30;
      } else {
        day += 7;
      }
    }
  } else {
    if (monthThirtyOne[month - 1].isThirtyOne) {
      if (day + 7 > 31) {
        month += 1;
        day = day + 7 - 31;
      } else {
        day += 7;
      }
    } else if (monthThirtyOne[month - 1].isThirty) {
      if (day + 7 > 30) {
        month += 1;
        day = day + 7 - 30;
      } else {
        day += 7;
      }
    } else {
      if (day+7>=29 ) {
        if (year %4 == 0) {
          month += 1;
          day = day + 7 - 29;
        } else {
            month += 1;
            day = day + 7 - 28;
        }
      } else {
        day += 7;
      }
    }
  }

  if (month < 10 && day < 10) {
    return { fecha_string: `${year}-0${month}-0${day}`, day, month, year };
  } else if (month < 10) {
    return { fecha_string: `${year}-0${month}-${day}`, day, month, year };
  }
  return { fecha_string: `${year}-${month}-${day}`, day, month, year };
}
function obtenerDiaActual() {
  var date = new Date();
  var month = date.getMonth();
  var diaActual = date.getDate();
  var year = date.getFullYear();
  var numDia = date.getDay();
  if (numDia == 0) {
    numDia = 7;
  }
  for (let i = 1; i < numDia; i++) {
    if (diaActual == 1) {
      if (monthThirtyOne[month - 1].isThirtyOne) {
        diaActual = 31;
      } else if (monthThirtyOne[month - 1].isThirty) {
        diaActual = 30;
      } else {
        diaActual = 28;
      }
    } else {
      diaActual--;
    }
  }
  if (monthThirtyOne[date.getMonth() - 1].isThirtyOne) {
    if (diaActual < 21) {
      diaActual = 31 + diaActual - 21;
    } else diaActual = diaActual - 21;
  } else if (monthThirtyOne[date.getMonth() - 1].isThirtyOne) {
    if (diaActual < 21) {
      diaActual = 30 + diaActual - 21;
    } else diaActual = diaActual - 21;
  } else {
    if (diaActual < 21) {
      if (year % 4 == 0) {
        diaActual = 29 + diaActual - 21;
      } else {
        diaActual = 28 + diaActual - 21;
      }
    } else diaActual = diaActual - 21;
  }
  return diaActual;
}
export function generarFechaAnteriorPorSemana() {
  const date = new Date();
  var year = date.getFullYear();
  year = parseInt(year);
  var day = obtenerDiaActual();
  var diaActual = date.getDate();
  var month = 0;
  if (diaActual - 21 < 0) {
    month = date.getMonth();
  } else {
    month = date.getMonth() + 1;
  }

  month = parseInt(month);
  let fechas = [];
  if (month < 10) {
    fechas[0] = { fecha_string: `${year}-0${month}-${day}`, day, month, year };
  } else {
    fechas[0] = { fecha_string: `${year}-${month}-${day} `, day, month, year };
  }
  for (let i = 1; i <= 4; i++) {
    if (i == 4) {
      fechas[i] = generarFechaSiguiente(
        fechas[i - 1].day + 1,
        fechas[i - 1].month,
        fechas[i - 1].year
      );
    } else {
      fechas[i] = generarFechaSiguiente(
        fechas[i - 1].day,
        fechas[i - 1].month,
        fechas[i - 1].year
      );
    }
  }
  console.log(fechas);
  return fechas;
}
export function generarFechasAnteriorPorDia() {
  var actualDate = new Date();
  var fechas = [];
  var year = actualDate.getFullYear();
  var dayStart = actualDate.getDate();
  var monthStart = actualDate.getMonth();
  if (monthThirtyOne[monthStart - 1].isThirtyOne) {
    for (let i = 0; i <= 33; i++) {
      if (dayStart > 31) {
        dayStart = 1;
        monthStart += 1;
      }
      if (dayStart < 10 && monthStart < 10)
        fechas[i] = { fecha_string: `${year}-0${monthStart}-0${dayStart}` };
      else if (dayStart < 10) {
        fechas[i] = { fecha_string: `${year}-${monthStart}-0${dayStart}` };
      } else {
        fechas[i] = { fecha_string: `${year}-0${monthStart}-${dayStart}` };
      }
      dayStart++;
    }
  } else if (monthThirtyOne[monthStart - 1].isThirty) {
    for (let i = 0; i <= 31; i++) {
      if (dayStart > 30) {
        dayStart = 1;
        monthStart += 1;
      }
      if (dayStart < 10 && monthStart < 10)
        fechas[i] = { fecha_string: `${year}-0${monthStart}-0${dayStart}` };
      else if (dayStart < 10) {
        fechas[i] = { fecha_string: `${year}-${monthStart}-0${dayStart}` };
      } else {
        fechas[i] = { fecha_string: `${year}-0${monthStart}-${dayStart}` };
      }
      dayStart++;
    }
  } else {
    for (let i = 0; i <= 29; i++) {
      if (year / 4) {
        if (!monthThirtyOne.isThirty && dayStart > 29) {
          dayStart = 1;
          monthStart += 1;
        } else {
          if (!monthThirtyOne.isThirty && dayStart > 28) {
            dayStart = 1;
            monthStart += 1;
          }
        }
      }
      if (dayStart < 10 && monthStart < 10)
        fechas[i] = { fecha_string: `${year}-0${monthStart}-0${dayStart}` };
      else if (dayStart < 10) {
        fechas[i] = { fecha_string: `${year}-${monthStart}-0${dayStart}` };
      } else {
        fechas[i] = { fecha_string: `${year}-0${monthStart}-${dayStart}` };
      }
      dayStart++;
    }
  }
  return fechas;
}
export function generarFechaPorMes() {
  var fechaActual = new Date();
  var mes = fechaActual.getMonth() + 1;
  var year = fechaActual.getFullYear();
  var day = 1;
  var fechas = [];
  if (mes - 4 < 0) {
    mes = 12 + (mes - 3);
    year -= 1;
  } else {
    mes -= 3;
  }
  for (let i = 0; i < 5; i++) {
    if (day < 10 && mes < 10) {
      fechas[i] = { fecha_string: `${year}-0${mes}-0${day}` };
    } else if (day < 10) {
      fechas[i] = { fecha_string: `${year}-${mes}-0${day}` };
    } else {
      fechas[i] = { fecha_string: `${year}-0${mes}-${day}` };
    }
    if (mes == 12) {
      mes = 1;
      year += 1;
    } else {
      mes++;
    }
  }
  return fechas;
}
export function generarFechaPorAño() {
  var fechaActual = new Date();
  var day = 1;
  var month = 1;
  var year = fechaActual.getFullYear() - 3;
  var fechas = [];
  for (let i = 0; i < 5; i++) {
    fechas[i] = { fecha_string: `${year}-0${month}-${day}` };
    year++;
  }
  return fechas;
}
