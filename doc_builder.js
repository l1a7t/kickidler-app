class DocBuilder {
  constructor(JSONanswer) {
    this.JSONanswer = JSONanswer;
    this.JSONcurrencies = PDFlanguages.currency;
    this.withConversion = 1;
    //switch statements for pdf generation
    //language definition switch
    switch (JSON.stringify(this.JSONanswer.lang).replace(/"/g,"")) {
    case "Русский":
      this.PDFlang = PDFlanguages.rus;
      this.isRussian = 1;
      break;
    case "Английский":
      this.PDFlang = PDFlanguages.eng;
      this.isRussian = 0;
      break;
    case "Португальский":
      this.PDFlang = PDFlanguages.por;
      this.isRussian = 0;
      break;
    default:
      break;
    };
    //seller definition switch
    switch (JSON.stringify(this.JSONanswer.seller).replace(/"/g,"")) {
    case "Кайо":
      this.seller = PDFlanguages.seller.Кайо;
      break;
    case "Александр":
      this.seller = PDFlanguages.seller.Александр;
      break;
    case "Владмир":
      this.seller = PDFlanguages.seller.Владмир;
      break;
    case "Кирилл":
      this.seller = PDFlanguages.seller.Кирилл;
      break;
    default:
      break;
    };
    //origin_currency definition switch
    switch (JSON.stringify(this.JSONanswer.origin_currency).replace(/"/g,"")) {
    case "RUB":
       this.price =
      {
        prices: PDFlanguages.currency.prices_rub,
        name: PDFlanguages.currency.name[0],
        symbol: PDFlanguages.currency.symbol[0]
      };
      break;
    case "USD":
      this.price =
      {
        prices: PDFlanguages.currency.prices_usd,
        name: PDFlanguages.currency.name[1],
        symbol: PDFlanguages.currency.symbol[1]
      };
      break;
    default:
      break;
    };
    //building the currencies object
    if(JSON.stringify(this.JSONanswer.conversion_currency).replace(/"/g,"") == "Без конверции валют")
    {
      this.currencies =
      {
        origin: this.price,
        client: {}
      };
      // this.withConversion = 0;
    }
    else
    {
      let str = JSON.stringify(this.JSONanswer.conversion_currency).replace(/"/g,"").split("-");
      console.log(str);
      this.currencies =
      {
        origin: this.price,
        client:
        {
          conversion: this.JSONanswer.conversion_rate,
          name: str[0],
          symbol: str[1],
        }
      }
    };
   }

  buildDoc(pdfTablePrices) {
    if(this.withConversion = 0)
    {
      var DOCdefinition = {
        content: [
          { image: 'build/logo-big.png', style: 'imgcorner', width: 223, height: 57  },
          { text: JSON.stringify(this.PDFlang.h1).replace(/"/g,""), style: 'header', margin: [0, 0, 0, 90] },
          { text: JSON.stringify(this.PDFlang.h2).replace(/"/g,""), style: 'subheader' },
          { text: JSON.stringify(this.JSONanswer.client).replace(/"/g,""), style: 'header', fontSize: 20, margin: [0, 0, 0, 20] },
          { text: JSON.stringify(this.PDFlang.h3).replace(/"/g,""), style: 'subheader' },
          { text: JSON.stringify(this.seller[this.isRussian]).replace(/"/g,"") + ' - Kickidler',  style: 'header', fontSize: 20, margin: [0, 0, 0, 110] },
          { image: 'build/pdfback.jpg', alignment: 'center' },
          {
            pageBreak: 'before',
            margin: [0, 0, 0, 30],
            table: {
              body: [
                [
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'],
                    fillColor: '#172259',
                    text: JSON.stringify(this.PDFlang.p1).replace(/"/g,""), style: 'headertable1'
                  }
                ],
                [
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'],
                    text: JSON.stringify(this.PDFlang.p2).replace(/"/g,""), style: 'paratable1'
                  }
                ],
                [
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'],
                    fillColor: '#172259',
                    text: JSON.stringify(this.PDFlang.p3).replace(/"/g,""), style: 'headertable1'
                  }
                ],
                [
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'],
                    ul: [
                      ' ' + JSON.stringify(this.PDFlang.p4).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p5).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p6).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p7).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p8).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p9).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p10).replace(/"/g,"")
                    ],
                     style: 'paratable1',
                  }
                ],
                [
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'],
                    fillColor: '#172259',
                    text: JSON.stringify(this.PDFlang.p11).replace(/"/g,""), style: 'headertable1'
                  }
                ],
                [
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'],
                    stack: [
                      JSON.stringify(this.PDFlang.p12).replace(/"/g,""),
                      JSON.stringify(this.PDFlang.p13).replace(/"/g,""),
                      JSON.stringify(this.PDFlang.p14).replace(/"/g,""),
                      JSON.stringify(this.PDFlang.p15).replace(/"/g,""),
                    ],
                     style: 'paratable1'
                  }
                ]
              ]
            }
          },
          {
            margin: [0, 0, 0, 30],
            table: {
              body: [
                [
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'],
                    fillColor: '#004163',
                    text: JSON.stringify(this.PDFlang.p16).replace(/"/g,""), style: 'headertable1'
                  }
                ],
                [
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'],
                    fillColor: '#d8e6f2',
                    stack: [
                      JSON.stringify(this.PDFlang.p17).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p18).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p19).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p20).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p21).replace(/"/g,""),
                    ],
                     style: 'paratable1',
                  }
                ]
              ]
            }
          },
          {
            table: {
              body: [
                [{colSpan: 2, text: JSON.stringify(this.PDFlang.t1).replace(/"/g,"") }, {}],
                [{text: JSON.stringify(this.PDFlang.t2).replace(/"/g,"") },{text: JSON.stringify(this.PDFlang.t3).replace(/"/g,"") },],
                [{text: JSON.stringify(this.PDFlang.t4).replace(/"/g,"") },{text: JSON.stringify(this.PDFlang.t5).replace(/"/g,"") + " " + JSON.stringify(this.JSONanswer.amount).replace(/"/g,"") + " " + JSON.stringify(this.PDFlang.t5_1[1]).replace(/"/g,"") }],
                [{text: JSON.stringify(this.PDFlang.t6).replace(/"/g,"") },{text: JSON.stringify(this.PDFlang.t7).replace(/"/g,"") },],
              ]
            },
          }
        ],
        styles: {
          imgcorner: {
            alignment: 'right',
            margin: [0, 10, 0, 100]
          },
          header: {
            font: 'Gothic',
            alignment: 'center',
            fontSize: 28,
            bold: true,
            color: 'grey',
          },
          subheader: {
            font: 'Gothic',
            alignment: 'center',
            fontSize: 16,
            bold: true,
            color: 'silver',
          },
          headertable1: {
            font: 'Gothic',
            alignment: 'center',
            fontSize: 10,
            bold: true,
            color: 'white'
          },
          paratable1: {
            font: 'Gothic',
            fontSize: 11,
            bold: false,
            color: 'black'
          },
        }
      };
    }
    else
    {
      var DOCdefinition = {
        pageMargins: [20, 60, 20, "*"],
        content: [
          { image: 'build/logo-big.png', style: 'imgcorner', width: 223, height: 57  },
          { text: JSON.stringify(this.PDFlang.h1).replace(/"/g,""), style: 'header', margin: [0, 0, 0, 90] },
          { text: JSON.stringify(this.PDFlang.h2).replace(/"/g,""), style: 'subheader' },
          { text: JSON.stringify(this.JSONanswer.client).replace(/"/g,""), style: 'header', fontSize: 20, margin: [0, 0, 0, 20] },
          { text: JSON.stringify(this.PDFlang.h3).replace(/"/g,""), style: 'subheader' },
          { text: JSON.stringify(this.seller[this.isRussian]).replace(/"/g,"") + ' - Kickidler',  style: 'header', fontSize: 20, margin: [0, 0, 0, 110] },
          { image: 'build/pdfback.jpg', alignment: 'center' },
          {
            pageBreak: 'before',
            margin: [0, 0, 0, 30],
            table: {
              body: [
                [
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'],
                    fillColor: '#172259',
                    text: JSON.stringify(this.PDFlang.p1).replace(/"/g,""), style: 'headertable1'
                  }
                ],
                [
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'],
                    text: JSON.stringify(this.PDFlang.p2).replace(/"/g,""), style: 'paratable1'
                  }
                ],
                [
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'],
                    fillColor: '#172259',
                    text: JSON.stringify(this.PDFlang.p3).replace(/"/g,""), style: 'headertable1'
                  }
                ],
                [
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'],
                    ul: [
                      ' ' + JSON.stringify(this.PDFlang.p4).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p5).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p6).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p7).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p8).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p9).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p10).replace(/"/g,"")
                    ],
                     style: 'paratable1',
                  }
                ],
                [
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'],
                    fillColor: '#172259',
                    text: JSON.stringify(this.PDFlang.p11).replace(/"/g,""), style: 'headertable1'
                  }
                ],
                [
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'],
                    stack: [
                      JSON.stringify(this.PDFlang.p12).replace(/"/g,""),
                      JSON.stringify(this.PDFlang.p13).replace(/"/g,""),
                      JSON.stringify(this.PDFlang.p14).replace(/"/g,""),
                      JSON.stringify(this.PDFlang.p15).replace(/"/g,""),
                    ],
                     style: 'paratable1'
                  }
                ]
              ]
            }
          },
          {
            margin: [0, 0, 0, 30],
            table: {
              body: [
                [
                  { colSpan: 2, borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'], fillColor: '#004163',
                    text: JSON.stringify(this.PDFlang.p16).replace(/"/g,""), style: 'headertable1'
                  },
                  {}
                ],
                [
                  {
                    colSpan: 2, borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'], fillColor: '#d8e6f2',
                    stack: [
                      JSON.stringify(this.PDFlang.p17).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p18).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p19).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p20).replace(/"/g,""),
                      ' ' + JSON.stringify(this.PDFlang.p21).replace(/"/g,""),
                    ],
                     style: 'paratable1',
                  },
                  {}
                ],
                [
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'], fillColor: '#d8e6f2',
                    text: JSON.stringify(this.PDFlang.p22).replace(/"/g,""), style: 'paratable1',
                  },
                  {
                    borderColor: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3'], fillColor: '#d8e6f2',
                    text: JSON.stringify(this.PDFlang.p23).replace(/"/g,""), style: 'paratable1',
                  }
                ]
              ]
            }
          },
          {
            table: {
              body: [
                [{colSpan: 2, text: JSON.stringify(this.PDFlang.t1).replace(/"/g,"") }, {}],
                [{text: JSON.stringify(this.PDFlang.t2).replace(/"/g,"") },{text: JSON.stringify(this.PDFlang.t3).replace(/"/g,"") },],
                [{text: JSON.stringify(this.PDFlang.t4).replace(/"/g,"") },{text: JSON.stringify(this.PDFlang.t5).replace(/"/g,"") + " " + JSON.stringify(this.JSONanswer.amount).replace(/"/g,"") + " " + JSON.stringify(this.PDFlang.t5_1[1]).replace(/"/g,"") }],
                [{text: JSON.stringify(this.PDFlang.t6).replace(/"/g,"") },{text: JSON.stringify(this.PDFlang.t7).replace(/"/g,"") },],
              ]
            },
          },
          {
            pageBreak: 'before',
            margin: [0, 0, 0, 20],
            table: {
              widths: [95, 75, 65, 75, 80, "*"],
              heights: 20,
              body: [
                [{text: JSON.stringify(this.PDFlang.t8).replace(/"/g,"")},
                {text: JSON.stringify(this.PDFlang.t9).replace(/"/g,"")},
                {text: JSON.stringify(this.PDFlang.t10).replace(/"/g,"") + " " + JSON.stringify(this.currencies.origin.name).replace(/"/g,"")},
                {text: JSON.stringify(this.PDFlang.t11).replace(/"/g,"")},
                {text: JSON.stringify(this.PDFlang.t12).replace(/"/g,"") + " " + JSON.stringify(this.currencies.client.name).replace(/"/g,"")},
                {text: JSON.stringify(this.PDFlang.t13).replace(/"/g,"")}]
              ]
            }
          },
          {
            margin: [0, 0, 0, 20],
            table: {
              widths: [95, 75, 65, 75, 80, "*"],
              heights: 20,
              body: [
                [{text: JSON.stringify(this.PDFlang.t14).replace(/"/g,"")},{text: JSON.stringify(this.PDFlang.t16).replace(/"/g,"")},{},{},{},{}],
                [{text: JSON.stringify(this.PDFlang.t15).replace(/"/g,"")},{text: JSON.stringify(this.PDFlang.t16).replace(/"/g,"")},{},{},{},{}]
              ]
            }
          },
          {
            margin: [0, 0, 0, 20],
            table: {
              widths: [95, 75, 65, 75, 80, "*"],
              heights: 20,
              body: [
                [{text: JSON.stringify(this.PDFlang.t14).replace(/"/g,"")},{text: JSON.stringify(this.PDFlang.t17).replace(/"/g,"")},{},{},{},{}],
                [{text: JSON.stringify(this.PDFlang.t15).replace(/"/g,"")},{text: JSON.stringify(this.PDFlang.t17).replace(/"/g,"")},{},{},{},{}]
              ]
            }
          },
          {
            margin: [0, 0, 0, 20],
            table: {
              widths: [95, 75, 65, 75, 80, "*"],
              heights: 20,
              body: [
                [{text: JSON.stringify(this.PDFlang.t14).replace(/"/g,"")},{text: JSON.stringify(this.PDFlang.t18).replace(/"/g,"")},{},{},{},{}],
                [{text: JSON.stringify(this.PDFlang.t15).replace(/"/g,"")},{text: JSON.stringify(this.PDFlang.t18).replace(/"/g,"")},{},{},{},{}]
              ]
            }
          },
          {
            margin: [0, 0, 0, 20],
            table: {
              widths: [95, 75, 65, 75, 80, "*"],
              heights: 20,
              body: [
                [{text: JSON.stringify(this.PDFlang.t14).replace(/"/g,"")},{text: JSON.stringify(this.PDFlang.t19).replace(/"/g,"")},{},{},{},{}],
                [{text: JSON.stringify(this.PDFlang.t15).replace(/"/g,"")},{text: JSON.stringify(this.PDFlang.t19).replace(/"/g,"")},{},{},{},{}]
              ]
            }
          },
          {
            margin: [0, 0, 0, 20],
            table: {
              widths: [95, 75, 65, 75, 80, "*"],
              heights: 20,
              body: [
                [{text: JSON.stringify(this.PDFlang.t14).replace(/"/g,"")},{text: JSON.stringify(this.PDFlang.t20).replace(/"/g,"")},{},{},{},{}],
                [{text: JSON.stringify(this.PDFlang.t15).replace(/"/g,"")},{text: JSON.stringify(this.PDFlang.t20).replace(/"/g,"")},{},{},{},{}]
              ]
            }
          },
          {
            margin: [0, 0, 0, 20],
            table: {
              widths: [95, 75, 65, 75, 80, "*"],
              heights: 20,
              body: [
                [{text: JSON.stringify(this.PDFlang.t14).replace(/"/g,"")},{text: JSON.stringify(this.PDFlang.t21).replace(/"/g,"")},{},{},{},{}],
                [{text: JSON.stringify(this.PDFlang.t15).replace(/"/g,"")},{text: JSON.stringify(this.PDFlang.t21).replace(/"/g,"")},{},{},{},{}]
              ]
            }
          },
            {text: JSON.stringify(this.PDFlang.t22).replace(/"/g,"")},
            {text: JSON.stringify(this.PDFlang.t23).replace(/"/g,"")},
            {text: JSON.stringify(this.PDFlang.t24).replace(/"/g,"")},
            {text: JSON.stringify(this.PDFlang.t25).replace(/"/g,"")},
            {text: JSON.stringify(this.PDFlang.t26).replace(/"/g,"")},
            {text: JSON.stringify(this.PDFlang.t27).replace(/"/g,"")},
            {text: JSON.stringify(this.PDFlang.t28).replace(/"/g,"")},
            {text: JSON.stringify(this.PDFlang.t29).replace(/"/g,"")},
            {
              margin: [0, 20, 0, 0],
              table: {
                body: [
                  [{text: JSON.stringify(this.PDFlang.t14).replace(/"/g,"")},{text: JSON.stringify(this.PDFlang.t21).replace(/"/g,"")},{},{},{},{}],
                  [{text: JSON.stringify(this.PDFlang.t15).replace(/"/g,"")},{text: JSON.stringify(this.PDFlang.t21).replace(/"/g,"")},{},{},{},{}]
                ]
              }
            },
        ],
        styles: {
          imgcorner: {
            alignment: 'right',
            margin: [0, 10, 0, 100]
          },
          header: {
            font: 'Gothic',
            alignment: 'center',
            fontSize: 28,
            bold: true,
            color: 'grey',
          },
          subheader: {
            font: 'Gothic',
            alignment: 'center',
            fontSize: 16,
            bold: true,
            color: 'silver',
          },
          headertable1: {
            font: 'Gothic',
            alignment: 'center',
            fontSize: 10,
            bold: true,
            color: 'white'
          },
          paratable1: {
            font: 'Gothic',
            fontSize: 11,
            bold: false,
            color: 'black'
          },
        }
      };
    }
    return DOCdefinition;
  };

  calculatePrices()
  {
    let priceForX = this.currencies.origin.prices.map((element) => {
	    return element*Number(this.JSONanswer.amount);
    }); //Стоимость для x
    console.log(priceForX);
    let temp_array1 = Array.from(priceForX);
    let priceDiscounted = temp_array1.splice(-3);
    let temp_array2 = [(priceDiscounted[0] - priceDiscounted[0]*Number(this.JSONanswer.discount_year)/100),(priceDiscounted[1] - priceDiscounted[1]*Number(this.JSONanswer.discount_3years)/100),(priceDiscounted[2] - priceDiscounted[2]*Number(this.JSONanswer.discount_lifetime)/100)];
    priceDiscounted = temp_array1.concat(temp_array2); //Результат со скидкой

    let pdfTablePrices = {};

    if(this.withConversion == 0)
    {
      temp_array1 = [];
      for (let i = 0; i < priceDiscounted.length; i++)
      {
        temp_array1[i] = (priceDiscounted[i]/this.JSONcurrencies.durations[i]*Number(this.JSONanswer.amount).toFixed(2));
      };
      pdfTablePrices =
      {
        priceForX: priceForX,
        priceDiscounted: priceDiscounted,
        priceMonthUser: temp_array1
      };
    }
    else
    {
      temp_array1 = [];
      temp_array2 = [];
      let bankTarrif = priceDiscounted.map((element) => {
        return ((element+(element*3.8))*Number(this.JSONanswer.conversion_rate));
      }); //Bank array
      let paypalTarrif = priceDiscounted.map((element) => {
        return ((element+(element*2.9))*Number(this.JSONanswer.conversion_rate));
      }); //Paypal array
      for (let i = 0; i < bankTarrif.length; i++)
      {
        temp_array1[i] = (bankTarrif[i]/this.JSONcurrencies.durations[i]*Number(this.JSONanswer.amount).toFixed(2));
      };
      for (let i = 0; i < paypalTarrif.length; i++)
      {
        temp_array2[i] = (paypalTarrif[i]/this.JSONcurrencies.durations[i]*Number(this.JSONanswer.amount)).toFixed(2);
      };

      pdfTablePrices =
      {
        priceForX: priceForX,
        priceDiscounted: priceDiscounted,
        priceBank: bankTarrif,
        pricePaypal: paypalTarrif,
        priceMonthUser1: temp_array1,
        priceMonthUser2: temp_array1
      }
    }

    return pdfTablePrices;
  }

}

module.exports = DocBuilder;
