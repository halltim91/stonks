import { render } from '@testing-library/react';
import Commodity, { calculateChange, CommoditySymbolMap, percentChange } from '../components/comodities/comodities';


const mockData1: CommoditySymbolMap = {
  symbol: 'gold',
  commodityInfo: {
    name: 'Gold',
    data: [{ date: '2023-01-01', value: '1000' },{ date: '2022-12-31', value: '1001' }],
  },
};

const mockData2: CommoditySymbolMap = {
  symbol: 'gold',
  commodityInfo: {
    name: 'Gold',
    data: [{ date: '2023-01-01', value: '1000' },{ date: '2022-12-31', value: '999' }],
  },
};

describe('CommoditySymbolMap interface', () => {
  it('should have the correct strucure', () => {
    expect(mockData1).toEqual({
      symbol: expect.any(String),
      commodityInfo: {
        name: expect.any(String),
        data: expect.arrayContaining([
          {
            date: expect.any(String),
            value: expect.any(String),
          },
        ]),
      },
    });
  });
});

describe('Test Calculate change', ()=>{
    it('Should return positive difference',()=>{
        const change = calculateChange(mockData1.commodityInfo)
        expect(change).toEqual('1.00')
    })

    it('Should return negative difference',()=>{
        const change = calculateChange(mockData2.commodityInfo)
        expect(change).toEqual('-1.00')
    })
})


describe('Test percentage change', () => {
  it('calculate correct percentage', () => {
    const percentage = percentChange(mockData1.commodityInfo)
    expect(percentage).toEqual('0.10')
  })

  it('calculate correct negative percentage', () => {
    const percentage = percentChange(mockData2.commodityInfo)
    expect(percentage).toEqual('-0.10')
  })
})



//integration test for commodities component
describe('commodities component test', () => {
  const view = render(<Commodity />)
  it('Check for commodity field', ()=>{
  // eslint-disable-next-line jest/valid-expect-in-promise, testing-library/prefer-screen-queries
  view.findByText('Commodity').then(value=>{
    expect(value).toHaveTextContent('Commodity')
  })
  })

})
