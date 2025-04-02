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
  if (diaActual - 21 <= 0) {
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
  return fechas;
}
export function generarFechasAnteriorPorDia() {
  var actualDate = new Date();
  var fechas = [];
  var year = parseInt(actualDate.getFullYear());
  var day = parseInt(actualDate.getDate());
  var month = parseInt(actualDate.getMonth());
  if (monthThirtyOne[month - 1].isThirtyOne) {
    for (let i = 0; i <= 32; i++) {
      if (day > 31) {
        day = 1;
        month += 1;
      }
      if (day < 10 && month < 10)
        fechas[i] = { fecha_string: `${year}-0${month}-0${day}`,year,month: month,day: day };
      else if (day < 10) {
        fechas[i] = { fecha_string: `${year}-${month}-0${day}`,year,month: month,day: day };
      } else {
        fechas[i] = { fecha_string: `${year}-0${month}-${day}`,year,month: month,day: day };
      }
      day++;
    }
  } else if (monthThirtyOne[month - 1].isThirty) {
    for (let i = 0; i <= 31; i++) {
      if (day > 30) {
        day = 1;
        month += 1;
      }
      if (day < 10 && month < 10)
        fechas[i] = { fecha_string: `${year}-0${month}-0${day}` ,year,month: month,day: day };
      else if (day < 10) {
        fechas[i] = { fecha_string: `${year}-${month}-0${day}` ,year,month: month,day: day };
      } else {
        fechas[i] = { fecha_string: `${year}-0${month}-${day}`,year,month: month,day: day  };
      }
      day++;
    }
  } else {
    for (let i = 0; i <= 29; i++) {
      if (year / 4) {
        if (!monthThirtyOne.isThirty && day > 29) {
          day = 1;
          month += 1;
        } else {
          if (!monthThirtyOne.isThirty && day > 28) {
            day = 1;
            month += 1;
          }
        }
      }
      if (day < 10 && month < 10)
        fechas[i] = { fecha_string: `${year}-0${month}-0${day}` ,year,month: month,day: day };
      else if (day < 10) {
        fechas[i] = { fecha_string: `${year}-${month}-0${day}`,year,month: month,day: day };
      } else {
        fechas[i] = { fecha_string: `${year}-0${month}-${day}`,year,month: month,day: day };
      }
      day++;
    }
  }
  return fechas;
}
export function generarFechaPorMes() {
  var fechaActual = new Date();
  var month = fechaActual.getMonth() + 1;
  var year = fechaActual.getFullYear();
  var day = 1;
  var fechas = [];
  if (month - 4 < 0) {
    month = 12 + (month - 3);
    year -= 1;
  } else {
    month -= 3;
  }
  for (let i = 0; i < 5; i++) {
    if (day < 10 && month < 10) {
      fechas[i] = { fecha_string: `${year}-0${month}-0${day}` ,year,month };
    } else if (day < 10) {
      fechas[i] = { fecha_string: `${year}-${month}-0${day}` ,year,month };
    } else {
      fechas[i] = { fecha_string: `${year}-0${month}-${day}` ,year,month };
    }
    if (month == 12) {
      month = 1;
      year += 1;
    } else {
      month++;
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
    fechas[i] = { fecha_string: `${year}-0${month}-${day}`, year };
    year++;
  }
  return fechas;
}
