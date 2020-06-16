Highcharts.getJSON('https://raw.githubusercontent.com/brunaoliveira/vis_email/master/email.json', function (data) {
   
  var points = [],
    filterByP,
    filterByVal,
    filterByI = 0,
    boxesP,
    boxesI,
    fieldP,
    fieldI,
    filterBy,
    boxes,
    field,
    fieldName = {
      "Date":'date',
      "Subject":'subject',
      "Alias":'alias',
      "From_email":'from_email',
      "CC":'cc',
      "Body":'body'
    };

  for (filterBy in data) {
    if (data.hasOwnProperty(filterBy)) {
      filterByVal = 0;
      filterByP = {
        id: 'id_' + filterByI,
        name: filterBy,
        color: Highcharts.getOptions().colors[filterByI]
      };
      boxesI = 0;
      for (boxes in data[filterBy]) {
        if (data[filterBy].hasOwnProperty(boxes)) {
          boxesP = {
            id: filterByP.id + '_' + boxesI,
            name: boxes,
            parent: filterByP.id
          };
          points.push(boxesP);
          fieldI = 0;
          for (field in data[filterBy][boxes]) {
            if (data[filterBy][boxes].hasOwnProperty(field)) {
              fieldP = {
                id: boxesP.id + '_' + fieldI,
                name: fieldName[field],
                parent: boxesP.id,
                value: Math.round(+data[filterBy][boxes][field])
              };
              filterByVal += fieldP.value;
              points.push(fieldP);
              fieldI = fieldI + 1;
            }
          }
          boxesI = boxesI + 1;
        }
      }
      filterByP.value = Math.round(filterByVal / boxesI);
      points.push(filterByP);
      filterByI = filterByI + 1;
    }
  }
  Highcharts.chart('container', {
    series: [{
      type: 'treemap',
      layoutAlgorithm: 'sliceAndDice',
      allowDrillToNode: true,
      animationLimit: 1000,
      dataLabels: {
        enabled: false
      },
      levelIsConstant: false,
      levels: [{
        level: 1,
        dataLabels: {
          enabled: true
        },
        borderWidth: 3
      }],
      data: points
    }],
    subtitle: {
      text: 'Click points to drill down.'
    },
    title: {
      text: 'Email'
    }
  });
});
