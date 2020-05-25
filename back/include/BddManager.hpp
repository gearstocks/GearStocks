//
// EPITECH PROJECT, 2019
// test
// File description:
// test
//

#ifndef BDD_HPP_
# define BDD_HPP_

#include <string>
#include <vector>
#include <chrono>
#include <ctime>
#include <utility>

#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>

#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>

#include "../include/aho_corasick.hpp"

#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"

class BddManager
{
public:
  BddManager();
  ~BddManager();
  size_t	userConnect(std::string username, std::string password, std::string token);	
  size_t	userRegister(std::vector<std::string> documentContent);
  size_t	updateNameUser(std::string mailUser, std::string oldName, std::string newName);
  size_t	updatePseudoUser(std::string mailUser, std::string oldPseudo, std::string newPseudo);
  size_t	updateMailUser(std::string oldMail, std::string newMail);
  size_t	updateDateInBDD(std::string mailUser, std::string date);
  size_t	updateTokenInBDD(std::string mailUser, std::string token);
  size_t	updatePasswordUser(std::string mailUser, std::string oldPass, std::string newPass);
  size_t	resetPassword(std::string mailUser, std::string newPassword);
  std::string	getTime();
  size_t	disconnectUser(std::string mailUser, std::string token);
  size_t	addCarPartInBDD(std::string name, std::vector<std::string> prices, std::string photo, std::string description);
  std::string	generateRandomString(size_t size);
  aho_corasick::trie	generateTree();
  std::vector<std::string>	parseKeyWordInTree(aho_corasick::trie trie, std::string keyWord);
  rapidjson::Document*	getInfoUser(std::string userToken, std::string userMail);
  rapidjson::Document*	getFullCarPart(std::string partName);
  rapidjson::Document*	getCarPart(std::string partName);
private:
  void		connect();
  void		getAllPrices(rapidjson::Value *price, std::string *priceToParse, rapidjson::Document::AllocatorType &allocator);
  void		addAllPrices(bsoncxx::builder::stream::document *document, std::string month, std::string price);
  void		addContentInBDD(auto collection, bsoncxx::builder::stream::document &doc);
  void		printCollection(auto collection);
  void		deleteContentInBDD(auto collection, std::string field, std::string value);
  void		updateContentInBDD(auto collection, std::string field,
			   std::string oldValue, std::string newValue);
  std::string	checkIfExist(auto collection, std::string field, std::string value);
  std::string	cryptPass(std::string nonHashPass);
  mongocxx::instance	_inst{};
  mongocxx::client	_conn;
  mongocxx::collection	_userCollection;
  mongocxx::collection	_carPartCollection;
};

#endif
