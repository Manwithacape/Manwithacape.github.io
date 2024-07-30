import javax.swing.JFrame;
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        JFrame frame = new JFrame("Hello, Java!");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(300, 300);
        frame.setVisible(true);

    }
}