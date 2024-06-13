package com.star;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;

public class LogMessage {
   private static String LOG_FILE = "";

   public static void setLOG_FILE(String lOG_FILE) {
      LOG_FILE = lOG_FILE;
   }

   public static void generateLogs() {
      try {
         File file = new File(LOG_FILE);
         if (file.createNewFile()) {
            System.out.println("File has been created.");
         }
      } catch (FileNotFoundException var1) {
         System.out.println("An error occurred.");
         var1.printStackTrace();
      } catch (IOException var2) {
         var2.printStackTrace();
      }

   }

   public static void writeLogs(String logMsg) {
      try {
         FileWriter fw = new FileWriter(LOG_FILE, true);
         BufferedWriter bw = new BufferedWriter(fw);
         bw.write(logMsg + "\n");
         bw.close();
      } catch (FileNotFoundException var3) {
         System.out.println("An error occurred.");
         var3.printStackTrace();
      } catch (IOException var4) {
         var4.printStackTrace();
      }

   }
}
