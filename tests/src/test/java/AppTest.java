import org.junit.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class AppTest
{
    private WebDriver webDriver;
    String url;
    @Before
    public void setup()
    {
        webDriver = new FirefoxDriver();
        url  = "localhost:3000";
        webDriver.get(url);
    }

    @Test
    public void test()
    {
        
    }

    @After
    public void teardown()
    {
        webDriver.close();
    }
}
