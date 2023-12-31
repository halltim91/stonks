import React from 'react';
import { apiKey } from './fxApiKey';

export interface preReq {
  apiKey: string;
  fromSymbol: string;
  toSymbol: string[];
  interval: string[];
}

export const apiReqData: preReq = {
  apiKey: apiKey,
  fromSymbol: 'USD',
  toSymbol: [
    'AED',
    'AFN',
    'ALL',
    'AMD',
    'ANG',
    'AOA',
    'ARS',
    'AUD',
    'AWG',
    'AZN',
  ] /*, 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 
                                'BIF', 'BMD', 'BND', 'BOB', 'BRL'], 
                                /*'BSD', 'BTN', 'BWP', 
                                'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNH', 'CNY', 
                                'COP', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 
                                'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 
                                'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 
                                'HRK', 'HTG', 'HUF', 'ICP', 'IDR', 'ILS', 'INR', 'IQD', 
                                'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 
                                'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 
                                'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 
                                'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MRU', 'MUR', 'MVR', 
                                'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NOK', 'NPR', 
                                'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 
                                'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RUR', 'RWF', 'SAR', 
                                'SBDf', 'SCR', 'SDG', 'SDR', 'SEK', 'SGD', 'SHP', 'SLL', 
                                'SOS', 'SRD', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 
                                'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 
                                'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XDR', 
                                'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'ZWL'],*/,
  interval: ['1min', '5min', '15min', '30min', '60min'],
};

const apiReq = () => {
  return <div>api-req</div>;
};

export default apiReq;
