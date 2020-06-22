// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;

import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;
import twitter4j.Paging;

import java.util.List;
import java.util.stream.Collectors;

import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import com.google.gson.Gson;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/analyzeTwitter")
public class AnalyzeTweet extends HttpServlet {

    Twitter twitter = TwitterFactory.getSingleton();

    @Override
    public void init() throws ServletException {
    }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
      float worstScore = Float.MAX_VALUE;
      String worstScoreLink = null;

      try{
        List<Status> tl = twitter.getUserTimeline(request.getParameter("handle"), new Paging(1, 200));
        LanguageServiceClient languageService = LanguageServiceClient.create();
        
        tl.removeIf(status -> status.isRetweet());
        for(Status status:tl){
            Document doc = Document.newBuilder().setContent(status.getText()).setType(Document.Type.PLAIN_TEXT).build();
            Sentiment sentiment = languageService.analyzeSentiment(doc).getDocumentSentiment();
            float score = sentiment.getScore();
            worstScoreLink = score < worstScore ? "https://twitter.com/" + status.getUser().getScreenName() + "/status/" + status.getId() : worstScoreLink;
            worstScore = score < worstScore ? score : worstScore;
            
        }
        languageService.close();
        System.out.println("Worst Score: "+worstScore);
        System.out.println("Worst Score Tweet: "+worstScoreLink);

        Gson gson = new Gson();
        String json = gson.toJson(worstScoreLink);
        response.setContentType("text/html;");
        response.getWriter().println(json);

      } catch(Exception e){
          e.printStackTrace();
      }
    
  }
}
