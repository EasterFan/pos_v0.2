'use strict';


// 1.String 转为对象数组
function turnStringtoArray(inputs)
{
  var ItemSheetArray = new Array;
  for (let item of inputs)
  {
    ItemSheetArray.push(
      {barcode:item}
    );
  }

  return ItemSheetArray;
}



// 2.合并重复对象
function buildBarcode(ItemSheetArray)
{
  var barcode = new Array;
  for (let i=0;i<ItemSheetArray.length;i++)
  {
    for (let j=i+1;j<ItemSheetArray.length;j++)
    {
      if (ItemSheetArray[i].barcode == ItemSheetArray[j].barcode )
        j = ++i;
    }
    barcode.push(ItemSheetArray[i]);
  }
  return barcode;

}


// 3.数出每个barcode重复次数
function calculateBarcode(barcode, ItemSheetArray)
{
  var count = 0;
  var calculatedBarcode = new Array;
  for(let i=0;i<barcode.length;i++)
  {
    for (let item of ItemSheetArray)
    {
      if (barcode[i].barcode == item.barcode)
      {
        count++;
      }
    }

    calculatedBarcode[i] = {  'barcode': barcode[i].barcode ,'count': count };
    count = 0;
  }

  return  calculatedBarcode;
}


// 4.补全清单
function buildCompletedItemSheet(calculatedBarcode) {

  var completedItemSheet = new Array;
  var arraynum = 0;
  var TotalSheet = [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00

    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    }
  ];
  for (let i=0;i<TotalSheet.length;i++)
  {
    for (let j=0;j<calculatedBarcode.length;j++)
    {
      if (TotalSheet[i].barcode == calculatedBarcode[j].barcode)
      {
        completedItemSheet[arraynum++] = { 'barcode':TotalSheet[i].barcode,'name': TotalSheet[i].name, 'count': calculatedBarcode[j].count, 'price':TotalSheet[i].price, 'unit': TotalSheet[i].unit, };
      }

    }

  }
  return completedItemSheet;

}
// 5.计算一类商品小计和总价
function calculateSmallPriceTotalPrice(completedItemSheet)
{
  var SmallPriceTotalPrice = [];
  var singleItemList = 0;

  var totalPrice = 0;
  for (let item of completedItemSheet) {
    SmallPriceTotalPrice[singleItemList ++] = {
      name: item.name,
      count: item.count ,
      unit: item.unit,
      price: item.price.toFixed(2),
      smallPrice: parseInt(item.count) * parseInt(item.price),
    };
    totalPrice = totalPrice + parseInt(item.count).toFixed(2) * parseInt(item.price).toFixed(2);

    SmallPriceTotalPrice.totalPrice= totalPrice.toFixed(2);
  }

  return SmallPriceTotalPrice;
}



// 5.汇总的收据数组转为对象
function turnArraytoObject(SmallPriceTotalPrice)
{
  var singleItem = '';
  for (let item of SmallPriceTotalPrice) {
    singleItem +=  '名称：' +item.name + '，数量：' + item.count + item.unit + '，单价：' +item.price + '(元)，小计：' + item.smallPrice.toFixed(2) + '(元)' + "\n"
  }
  let ItemSheetObj = {
    singleItem: singleItem,
    totalPrice: SmallPriceTotalPrice.totalPrice,
  }

  return ItemSheetObj;
}



// 6.打印收据
function printReceipt(ItemSheetObj)
{
  return `***<没钱赚商店>收据***
${ItemSheetObj.singleItem}
----------------------
总计：${ItemSheetObj.totalPrice}(元)
**********************`

}



var inputs = [
  'ITEM000000',
  'ITEM000000',
  'ITEM000000',
  'ITEM000000',
  'ITEM000000',
  'ITEM000001',
  'ITEM000001',
  'ITEM000004'
];

var ItemSheetArray = turnStringtoArray(inputs);
 // console.log(ItemSheetArray);
var barcode = buildBarcode(ItemSheetArray);
 // console.log(barcode);
var calculatedBarcode = calculateBarcode(barcode, ItemSheetArray);
//  console.log(calculatedBarcode);
var completedItemSheet = buildCompletedItemSheet(calculatedBarcode);
// console.log(completedItemSheet);
var SmallPriceTotalPrice = calculateSmallPriceTotalPrice(completedItemSheet);
// console.log(SmallPriceTotalPrice);
var ItemSheetObj = turnArraytoObject(SmallPriceTotalPrice);
// console.log(ItemSheet);
var result = printReceipt(ItemSheetObj);

console.log(result);

