import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Commodity, {
  calculateChange,
  ComodityInfo,
  CommoditySymbolMap,
  percentChange,
} from '../components/comodities/comodities';

jest.mock('axios');
const maxios = axios as jest.Mocked<typeof axios>;

const WTI: ComodityInfo = {
  name: 'Crude Oil Prices WTI',
  data: [
    { date: '2023-11-27', value: '74.46' },
    { date: '2023-11-24', value: '.' },
    { date: '2023-11-24', value: '74.83' },
  ],
};

const BRENT: ComodityInfo = {
  name: 'Crude Oil Prices Brent',
  data: [
    { date: '2023-11-27', value: '79.49' },
    { date: '2023-11-24', value: '79.82' },
    { date: '2023-11-23', value: '80.85' },
  ],
};

const COPPER: ComodityInfo = {
  name: 'Global Price of Copper',
  data: [
    { date: '2023-10-01', value: '7941.35590909091' },
    { date: '2023-09-01', value: '8276.71380952381' },
    { date: '2023-08-01', value: '8347.82826086957' },
  ],
};

const ALUMINUM: ComodityInfo = {
  name: 'Global Price of Aluminum',
  data: [
    { date: '2023-10-01', value: '2194.39090909091' },
    { date: '2023-09-01', value: '2184.67380952381' },
    { date: '2023-08-01', value: '2135.58173913043' },
  ],
};

const RESOURCE: ComodityInfo = {
  name: 'Dummy values',
  data: [
    { date: '2023-10-01', value: '1.39090909091' },
    { date: '2023-09-01', value: '1.67380952381' },
    { date: '2023-08-01', value: '1.58173913043' },
  ],
};

const mockSymbokMap: CommoditySymbolMap = {
  symbol: 'gold',
  commodityInfo: {
    name: 'Gold',
    data: [
      { date: '2023-01-01', value: '1000' },
      { date: '2022-12-31', value: '1001' },
    ],
  },
};

async function loadMockData() {
  maxios.get.mockImplementation((url) => {
    if (url.includes('WTI')) {
      return Promise.resolve({
        data: WTI,
      });
    } else if (url.includes('BRENT')) {
      return Promise.resolve({
        data: BRENT,
      });
    } else if (url.includes('COPPER')) {
      return Promise.resolve({
        data: COPPER,
      });
    } else if (url.includes('ALUMINUM')) {
      return Promise.resolve({
        data: ALUMINUM,
      });
    }
    return Promise.resolve({
      data: RESOURCE,
    });
  });
  await act(async () => {
    render(<Commodity />);
  });
}

describe('CommoditySymbolMap interface', () => {
  it('should have the correct strucure', () => {
    expect(mockSymbokMap).toEqual({
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

describe('Test Calculate change', () => {
  it('Should return positive difference', () => {
    const change = calculateChange(COPPER);
    expect(change).toEqual('335.36');
  });

  it('Should return negative difference', () => {
    const change = calculateChange(ALUMINUM);
    expect(change).toEqual('-9.72');
  });

  it("Should handle missing data and with '.'", () => {
    const change = calculateChange(WTI);
    expect(change).toEqual('0.37');
  });
});

describe('Test percentage change', () => {
  it('calculate correct percentage', () => {
    const percentage = percentChange(COPPER);
    expect(percentage).toEqual('4.22');
  });

  it('calculate correct negative percentage', () => {
    const percentage = percentChange(ALUMINUM);
    expect(percentage).toEqual('-0.44');
  });
});

describe('Axios returns undefined data', () => {
  it('Should error on fetching data', async () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    maxios.get.mockRejectedValueOnce(undefined);

    render(<Commodity />);
    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledTimes(1);
    });
    consoleError.mockClear();
    consoleError.mockRestore();
  });
});

describe('Commodity component test', () => {
  it('Check for headers', async () => {
    await loadMockData();
    const commodityHeader = await screen.findByRole('columnheader', {
      name: 'Commodity',
    });
    const valueHeader = await screen.findByRole('columnheader', {
      name: 'Value',
    });
    const ChgAmtHeader = await screen.findByRole('columnheader', {
      name: 'Chg Amt',
    });
    const percentChgHeader = await screen.findByRole('columnheader', {
      name: '%Chg',
    });
    expect(commodityHeader).toBeInTheDocument();
    expect(valueHeader).toBeInTheDocument();
    expect(ChgAmtHeader).toBeInTheDocument();
    expect(percentChgHeader).toBeInTheDocument();
  });

  it('Check data loaded in table', async () => {
    await loadMockData();
    expect(screen.getByText('WTI')).toBeInTheDocument();
    expect(screen.getByText('BRENT')).toBeInTheDocument();
    expect(screen.getByText('ALUMINUM')).toBeInTheDocument();
    expect(screen.getByText('COPPER')).toBeInTheDocument();
  });

  it('Test button click', async () => {
    await loadMockData();
    const buttonOpen = screen.getByRole('button', {
      name: 'Crude Oil Prices WTI',
    });
    await act(async () => {
      userEvent.click(buttonOpen);
    });
    const buttonClose = screen.getByRole('button', { name: 'close' });
    await act(async () => {
      fireEvent.click(buttonClose);
    });
    expect(screen.queryByRole('button', { name: 'close' })).toBeNull();
  });
});
