export const deliveryOptions =
[
    {
        id:'1',
        deliveryDays:7,
        priceCents:0
    },
    {
        id:'2',
        deliveryDays:3,
        priceCents:499
    },
    {
        id:'3',
        deliveryDays:1,
        priceCents:999
    }
];
//function to loop through the delivery options and it is going to use in calculating the shipping charges , and dispaly it on payment summary option.
export function getdeliveryOption(deliveryOptionId)
{  let deliveryOption;

        deliveryOptions.forEach((option)=>{
          if(option.id === deliveryOptionId)
          {
            deliveryOption = option;
          }
        });
        return deliveryOption || deliveryOptions[0];
}