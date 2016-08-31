"""
Create OHLC - groups data to X minutes
JonV / May 16 2015
"""

import sys
import time, datetime
import pandas as pd

import matplotlib
import matplotlib.dates as mdates
import matplotlib.pyplot as plt
import matplotlib.dates as dt

from matplotlib.finance import candlestick_ohlc
from StockPlot import Figure

"""
Some datetimes don't have nanoseconds that's why I need to parse like this
"""
def parse(timestamps):
    clean = timestamps.split(".")[0] if '.' in timestamps else timestamps
    return pd.datetime.strptime(clean,"%Y-%m-%d %H:%M:%S")

dateparse = lambda dates: [pd.datetime.strptime(d, '%Y-%m-%d %H:%M:%S') for d in dates]


def plot_figure(buy_df, sell_df):
    # Create a figure
    stockFig = Figure()

    quote_date = buy_df.index.tolist()

    quote_buy_low = buy_df['low'].tolist()
    quote_sell_high = sell_df['high'].tolist()
    #dt = map(lambda d: mdates.date2num(d.to_pydatetime()), quote_date)
    
    # Add the plots
    stockFig.addDatePlot(quote_date, quote_buy_low, 'b-', 'Buy-low')
    #stockFig.addDatePlot(googDTS, googOpen, 'g-o', 'Opening Price')
    
    #stockFig.addDatePlot(googDTS, googHigh, 'g--o', 'High')
    #stockFig.addDatePlot(googDTS, googLow, 'r--o', 'Low')
    
    stockFig.addDatePlot(quote_date, quote_sell_high, 'r-', 'Sell-High')

    # Set a title for the stock plot
    stockFig.SetTitle('EUR/USD')

    # Save the figure
    stockFig.save('EURUSD-1mins.png')

    # Show the figure
    stockFig.show()

    return

def main(filename, resample_interval):
    df = pd.read_csv(filename, parse_dates=['DateTime'], index_col='DateTime', 
                         names=['Tid', 'Pair', 'DateTime', 'Buy', 'Sell', 'Dealable'], 
                         date_parser=parse)
    
    del df['Tid']
    del df['Dealable']
    del df['Pair']
    
    # group every 15 minutes and create OHLC
    resample_interval_str = str(resample_interval) + "Min"
    print "To resample the quote into %s" % resample_interval_str 
    #grouped_data = df.resample(resample_interval_str).ohlc({'Buy':'ohlc', 'Sell': 'ohlc'})
    buy_data = df.Buy.resample(resample_interval_str).ohlc()
    sell_data = df.Buy.resample(resample_interval_str).ohlc()
    buy_data = buy_data.fillna(method='ffill')
    #grouped_data = df.groupby(dr1minute.asof).agg({ 'Buy': lambda s: s.min(),
    #    'Sell': lambda s: s.max()})
    #grouped_data = df.resample('24H', how='ohlc')

    # save to file
    buy = buy_data.iloc[1:30]
    buy.to_csv(filename+'-OHLC-buy.csv')
    sell = sell_data.iloc[1:30]
    sell.to_csv(filename+'-OHLC-sell.csv')
    print "Finish the resampleing"

    plot_figure(buy, sell)
    '''
    call another python file and Figure 
    '''
    print "Plot the quote one by one"
    fig = plt.figure()
    fig.subplots_adjust(bottom=0.1)
    ax = fig.add_subplot(1,1,1)
    plt.title("Candlestick chart")
    Date = mdates.date2num(buy_data.index.to_pydatetime())
    
    #DOCHLV = zip(Date , buy_data.open, buy_data.close, buy_data.high, buy_data.low)
    #candlestick_ohlc(ax, DOCHLV, width=0.6, colorup='g', colordown='r', alpha=1.0)
    #plt.show()
    print "finish the plotting"
    
    
if __name__ == "__main__":
    if (len(sys.argv) < 3): 
        print 'create_OHLC.py <inputfile.csv> <resample in duration>'
        sys.exit(2)
    resample_min = sys.argv[2]
    main(sys.argv[1], resample_min)