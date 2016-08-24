"""
Create OHLC - groups data to X minutes
JonV / May 16 2015
"""

import sys
import pandas as pd

"""
Some datetimes don't have nanoseconds that's why I need to parse like this
"""
def parse(timestamps):
    clean = timestamps.split(".")[0] if '.' in timestamps else timestamps
    return pd.datetime.strptime(clean,"%Y-%m-%d %H:%M:%S")

dateparse = lambda dates: [pd.datetime.strptime(d, '%Y-%m-%d %H:%M:%S') for d in dates]

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
    grouped_data = df.resample(resample_interval_str).agg({ 'Buy': lambda s: s.min(),
        'Sell': lambda s: s.max()})
    #grouped_data = df.resample('24H', how='ohlc')

    # save to file
    grouped_data.to_csv(filename+'-OHLC.csv')
    print "Finish the resampleing"

    
if __name__ == "__main__":
    if (len(sys.argv) < 3):
        print 'create_OHLC.py <inputfile.csv> <resample in duration>'
        sys.exit(2)
    resample_min = sys.argv[2]
    main(sys.argv[1], resample_min)