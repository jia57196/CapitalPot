
#!/usr/bin/env python
'''
--------------------------------------------------------------------------------
Module Name:    StockPlot.py
Author:         Jon Peterson
Description:    This module creates nice summary plots for financial data with
                the x-axis properly labeled with the date/time stamp.
Dependencies:   pylab (aka MatPlotLib)
Examples:       http://stefaanlippens.net/pylab_date_tick_control
                http://matplotlib.org/api/dates_api.html#date-tickers
                http://matplotlib.org/api/dates_api.html#matplotlib.dates.WeekdayLocator
                http://docs.python.org/2/library/time.html#time.strftime
--------------------------------------------------------------------------------
'''

# Imports
import pylab
from matplotlib.dates import date2num, WeekdayLocator, DateFormatter
from matplotlib.dates import MO, TU, WE, TH, FR, SA, SU
from matplotlib.ticker import FuncFormatter, MaxNLocator
import matplotlib


#-------------------------------------------------------------------------------
#                                   Figure Class
#-------------------------------------------------------------------------------
class Figure(object):
    
    #---------------------------------------------------------------------------
    #                                 __init__
    #---------------------------------------------------------------------------
    def __init__(self, figSize=(5.0, 3.0), dpi=300):

        # Initialize class variables
        self.numPlots = 0
        self._plotDescriptions = []

        # Create a figure        
        self._figure = pylab.Figure(figsize=figSize, dpi=dpi)

        # Perform some figure setup
        pylab.hold(True)
        pylab.grid(True)

        # Add a formatter for the y-axis
        self._formatter = FuncFormatter(self._formatDollars)

        # Create a SetTitle method
        self.SetTitle = pylab.title

        return

    
    #---------------------------------------------------------------------------
    #                                addPlot
    #---------------------------------------------------------------------------
    def addPlot(self, dates, prices, style='b-', desc='', format='%m/%d/%Y'):
        '''
        This method allows different plots to be added to a figure. This method
        is basically a wrapper for the pylab.plot_date method, but it includes 
        some other special formatting to make things look pretty.

        Arguments:
            * dates (list)  - A list of datetime objects
            * prices (list) - A list of float values (ints are also acceptible)
            * style (str)   - This is the line style for the plot. See the 
                              MatPlotLib documentation for the "plot" method for
                              more information.
            * desc (str)    - A description of the plot. This is used to create
                              a legend if more than one plot is added to the
                              figure.
            * format (str)  - This follows a strftime format. This is the 
                              format of the x-axis labels.
        '''

        # Convert the dates to a pylab-friendly format
        dates = date2num(dates)

        # Create a date-based plot
        pylab.plot_date(dates, prices, style)
        
        # Get the current axis
        ax = pylab.gca()

        # Rotate the x-axis labels by 90 degrees
        pylab.xticks(rotation=90)

        # Make room for the labels
        pylab.subplots_adjust(bottom=0.20)

        # Format the date labels on the x-axis
        #ax.xaxis.set_major_locator( WeekdayLocator(byweekday=FR) )
        #ax.xaxis.set_major_formatter( DateFormatter('%a - %m/%d/%Y') )
        ax.xaxis.set_major_formatter( DateFormatter(format) )

        # Find out how many x-tick marks to use
        numTicks = self._getXTicks(len(dates))

        # Set the number of x-axis tick marks
        ax.xaxis.set_major_locator(MaxNLocator(numTicks))

        # Limit the x-axis
        pylab.xlim([dates[-1], dates[0]])

        # Format the y-axis for money
        ax.yaxis.set_major_formatter(self._formatter)
        
        # Set the number of y-axis tick marks
        ax.yaxis.set_major_locator(MaxNLocator(10))

        # Add the description to the list of plot descriptions
        self._plotDescriptions.append(desc)

        # Increment the plot counter
        self.numPlots += 1

        # See if we should add a legend
        if self.numPlots > 1:
            pylab.legend(self._plotDescriptions, loc='best')

        return


    #---------------------------------------------------------------------------
    #                                _getXTicks
    #---------------------------------------------------------------------------
    def _getXTicks(self, numDates):
        ''' Helper method to get the number of X-tick marks. '''
        N = 0
        if numDates <= 15:
            N = numDates        
        elif numDates <= 100:
            N = 15
        else:
            N = max(int(numDates / 10.), 15)
        return N


    #---------------------------------------------------------------------------
    #                                addDatePlot
    #---------------------------------------------------------------------------
    def addDatePlot(self, dates, prices, style='b-', description=''):
        '''
        This is a simple wrapper for the "addPlot" method. This method just 
        makes it easier to create date-based plots, where the x-axis is 
        labeled as a date, not a time.
        '''
        self.addPlot(dates, prices, style, description, format='%m/%d/%Y')
        return


    #---------------------------------------------------------------------------
    #                                addTimePlot
    #---------------------------------------------------------------------------
    def addTimePlot(self, times, prices, style='b-', description=''):
        '''
        This is a simple wrapper for the "addPlot" method. This method just 
        makes it easier to create time-based plots, where the x-axis is 
        labeled as a time, not a date.
        '''
        self.addPlot(times, prices, style, description, format='%I:%M:%S %p')
        return


    #---------------------------------------------------------------------------
    #                              _formatDollars
    #---------------------------------------------------------------------------
    def _formatDollars(self, value, tickPos):
        ''' Helper method to format the y-axis labels. '''
        return '$%.2f' % value


    #---------------------------------------------------------------------------
    #                                  show
    #---------------------------------------------------------------------------
    def show(self):
        ''' This is a blocking method, until the window is closed. '''
        # Show the figure
        pylab.show()
        return

    
    #---------------------------------------------------------------------------
    #                                  save
    #---------------------------------------------------------------------------
    def save(self, filePath='stockPlot.pdf', dpi=100):
        ''' This method saves the stock plot to a file. '''
        pylab.savefig(filePath, dpi=dpi)
        return
