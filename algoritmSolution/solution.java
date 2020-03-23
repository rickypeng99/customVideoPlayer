public class IgnAlgo {
    public static void main(String[] args) {

        int[] startDate = {1, 2, 1, 3, 5, 3, 7, 12, 6, 19, 23, 14, 8, 20, 28, 10, 13, 25, 9, 16, 4, 11, 7, 2};
        int[] duration = {3, 2, 4, 8, 1, 4, 5, 3, 8, 2, 7, 4, 3, 7, 3, 4, 6, 4, 1, 10, 5, 3, 2, 23};
        int[] rupees = {750, 500, 920, 1050, 200, 400, 1200, 370, 840, 165, 1520, 600, 430, 1100, 590, 900, 230, 1120, 460, 780, 410, 570, 1200, 2100};
        System.out.println(maxRupee(startDate, duration, rupees));

    }


    /**
     *
     * @param startDate an array of startdates
     * @param duration an array of duration
     * @param rupees an array of rupees
     * @return max ruppes Link can earn for a month
     */
    public static int maxRupee(int[] startDate, int[] duration, int[] rupees) {
        int questAmount = startDate.length;
        int days = 31; // how many days in total
        int[][] memo = new int[days + 1][questAmount];
        int[][][] trace = new int[days + 1][questAmount][2];
        //i denotes currentDate
        for (int i = 1; i < memo.length; i++) {
            //j denotes questIndex
            for (int j = 0; j < memo[i].length; j++) {

                //if able
                if (i - duration[j] == startDate[j]) {
                    int max = 0;
                    int[] maxIndex = new int[2];
                    
                    //find all previous max combo
                    for (int k = 0; k != j && k < memo[i].length; k++) {
                        for(int z = 0; z <= startDate[j]; z++){
                            if (memo[z][k] > max) {
                                max = memo[z][k];
                                maxIndex[0] = z;
                                maxIndex[1] = k;
                            }
                        }
                    }
                    memo[i][j] = max + rupees[j];
                    trace[i][j] = maxIndex;
                } else {
                    memo[i][j] = 0;
                }

            }

        }
        
        //-----tracing the answers
        int max = 0;
        int[] maxTrace = new int[2];
        for (int i = 1; i < memo.length; i++) {
            //j denotes questIndex
            for (int j = 0; j < memo[i].length; j++) {
                //System.out.print(memo[i][j]);
                if(max < memo[i][j]){
                    max = memo[i][j];
                    maxTrace[0] = i;
                    maxTrace[1] = j;
                }
            }
        }

        int[] now = maxTrace;
        while(now[0] > 0){
            int dateIndex = now[0];
            int questIndex = now[1];
            System.out.println("startDate: " + startDate[questIndex] + " duration: " + duration[questIndex] + " reward: " + rupees[questIndex]);
            now = trace[dateIndex][questIndex];
        }
        //----end tracing the answers
        
        
        return max;
    }
}
