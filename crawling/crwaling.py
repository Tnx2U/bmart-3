from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import csv
import random
import time

def market_crawling():
    all_product_list = []
    category_list = []
    url_target = ['907','908','909','910','911','912','913','914','915','032','918','012']

    driver = webdriver.Chrome('./driver/chromedriver84')
    driver.implicitly_wait(3)

    for url in url_target:
        product_list = []
        productDomLists = []
        id_count = 0

        driver.get('https://www.kurly.com/shop/goods/goods_list.php?category='+url)
        driver.implicitly_wait(5)
        time.sleep(2)

        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')

        ## 세부 카테고리 수 구하기
        categoryDetail = soup.select('div.inner_lnb > ul.list > li')

        ## 다음 세부 카테고리 탭을 클릭하고 해당 카테고리의 프로덕트들을 리스트에 추가
        for i in range(2, len(categoryDetail)):
            cate_btn = driver.find_element_by_xpath('//*[@id="lnbMenu"]/div[2]/ul/li[' + str(i) + ']/a')
            driver.implicitly_wait(3)
            cate_btn.click()
            time.sleep(2)
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            # tempList = soup.select('div.inner_listgoods > ul.list > li')
            # for temp in tempList:
            #     productDomList.append(temp)
            productDomLists.append(soup.select('div.inner_listgoods > ul.list > li'))

        for productDomList in productDomLists:
            tempList = []
            for productDom in productDomList:
                name = productDom.select('div.item > a.info > span.name')[0].text.replace("  ", "")
                price = productDom.select('div.item > a.info > span.cost > span.price')[0].text.replace(",","").replace("원","")
                registered_date = str('2020') + '-03-' + str(random.randrange(10, 28)) + ' 09:00:00:007'
                remain = random.randrange(0, 30)
                saled_count = random.randrange(0, 100)
                category_id = id_count
                img = productDom.select('div.item > div.thumb > a.img')[0]['style'].split('"')[1]
                tempList.append([name, price, registered_date, remain, saled_count, category_id, img])

            id_count += 1
            product_list.append(tempList)
        all_product_list.append(product_list)

    return all_product_list
    # names = soup.select('.name')
    #
    # for name in names:
    #     print(name.text.strip())

def makeCSV(allProductLists):
    columnNames = ['name','price', 'registered_date', 'remain', 'saled_count', 'category_id', 'img_url']

    for idx_par, productLists in enumerate(allProductLists):
        for idx_chi, productList in enumerate(productLists):
            file = open('./crawling_product/product_list_' + str(idx_par+1)+'_'+str(idx_chi+1) + '_hasCol.csv', 'w', encoding='utf-8', newline='')
            productListCSV = csv.writer(file)
            productListCSV.writerow(columnNames)
            for row in productList:
                productListCSV.writerow(row)
            file.close()




    # file = open('category_list.csv', 'w', encoding='utf-8', newline='')
    # categoryListCSV = csv.writer(file)
    # for row in categoryList:
    #     categoryListCSV.writerow(row)
    # file.close()


if __name__ == '__main__':
    result = market_crawling()
    makeCSV(result)

