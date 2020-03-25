import java.util.ArrayList;

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
        int[] endDays = new int[questAmount];
        //create endDays array to record the ending date of all quests
        for(int i = 0; i < endDays.length; i++) {
            endDays[i] = startDate[i] + duration[i];
        }
        int[] memo = new int[days + 1];
        ArrayList<Integer> trace = new ArrayList<>();
        for(int i = 1; i < memo.length; i++){
            //max amout of rupees earned on ith day
            int max = 0;
            int maxIndex = -1;
            for(int j = 0; j < questAmount; j++){
                if(endDays[j] == i){
                    for(int k = 0; k <= startDate[j]; k++) {
                        int newAmount = memo[startDate[j]] + rupees[j];
                        if (newAmount > max) {
                            max = newAmount;
                        }
                    }

                }
            }
            memo[i] = Math.max(max, memo[i - 1]);
        }
        return memo[31];
    }
}
