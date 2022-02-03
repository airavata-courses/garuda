package data_extractor;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.fail;

import java.io.IOException;
import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;

import com.garuda.dataextractor.extactor.NexradFetcher;

public class TestNexradFetcher {
		
    @Test                                               
    @DisplayName("Testing fetching NEXRAD data from S3")   
    public void testgetNexradData() {
    	List<String> result;
		try {
			NexradFetcher nf = new NexradFetcher();	
			result = nf.getNexradData("KABR", "2007", "01", "01", "000000", "003000", "Reflectivity");
	    	assertFalse(result.isEmpty());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			fail("Test Failed");
		}
    }

}
