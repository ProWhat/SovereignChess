




		var col0 = "rgb(240, 240, 240)";	// белый
		var col1 = "rgb(40, 40, 40)";		// черный
		var col2 = "rgb(255, 174, 200)";	// розовый
		var col3 = "rgb(100, 100, 100)";	// темно-серый
		var col4 = "rgb(200, 16, 26)";		// красный
		var col5 = "rgb(255, 127, 39)";		// оранжевый
		var col6 = "rgb(255, 242, 0)";		// желтый
		var col7 = "rgb(40, 210, 90)";		// зеленый
		var col8 = "rgb(0, 162, 232)";		// голубой
		var col9 = "rgb(63, 72, 204)";		// синий
		var col10 = "rgb(190, 190, 190)";	// светло-серый
		var col11 = "rgb(163, 73, 163)";	// сиреневый
		var col12 = "rgb(239, 228, 176)";	// светло-желтый
		var col13 = "rgb(223, 201, 96)";	// темно-желтый
		
		function deskColor(w)
		{
			for (var i = 0; i < tileY; i += 2)
			{
				for (var j = 0; j < tileX; j += 2)
				{
					mas[i][j].style.background = col12;
					mas[i][j].index = 12;
					mas[i][j].name = 0;
					mas[i][j + 1].style.background = col13;
					mas[i][j + 1].index = 13;
					mas[i][j + 1].name = 0;
					
					if (w == 1)
					{
						masF[i][j].style.background = col12;
						masF[i][j].index = 12;
						masF[i][j + 1].style.background = col13;
						masF[i][j + 1].index = 13;
					}
				}
				
				for (var j = 0; j < tileX; j += 2)
				{
					mas[i + 1][j].style.background = col13;
					mas[i + 1][j].index = 13;
					mas[i + 1][j].name = 0;
					mas[i + 1][j + 1].style.background = col12;
					mas[i + 1][j + 1].index = 12;
					mas[i + 1][j + 1].name = 0;
					
					if (w == 1)
					{
						masF[i + 1][j].style.background = col13;
						masF[i + 1][j].index = 13;
						masF[i + 1][j + 1].style.background = col12;
						masF[i + 1][j + 1].index = 12;
					}
				}
			}
			
			mas[7][7].style.background = col0;	// белый - 0
			mas[7][7].index = 0;
			mas[8][8].style.background = col0;	// белый - 0
			mas[8][8].index = 0;
			mas[7][8].style.background = col1;	// черный - 1
			mas[7][8].index = 1;
			mas[8][7].style.background = col1;	// черный - 1
			mas[8][7].index = 1;
			mas[7][5].style.background = col2;	// розовый - 2
			mas[7][5].index = 2;
			mas[8][10].style.background = col2;	// розовый - 2
			mas[8][10].index = 2;
			mas[6][6].style.background = col3;	// темно-серый - 3
			mas[6][6].index = 3;
			mas[9][9].style.background = col3;	// темно-серый - 3
			mas[9][9].index = 3;
			mas[4][4].style.background = col4;	// красный - 4
			mas[4][4].index = 4;
			mas[11][11].style.background = col4;	// красный - 4
			mas[11][11].index = 4;
			mas[5][7].style.background = col5;	// оранжевый - 5
			mas[5][7].index = 5;
			mas[10][8].style.background = col5;	// оранжевый - 5
			mas[10][8].index = 5;
			mas[5][5].style.background = col6;	// желтый - 6
			mas[5][5].index = 6;
			mas[10][10].style.background = col6;	// желтый - 6
			mas[10][10].index = 6;
			mas[5][10].style.background = col7;	// зеленый - 7
			mas[5][10].index = 7;
			mas[10][5].style.background = col7;	// зеленый - 7
			mas[10][5].index = 7;
			mas[5][8].style.background = col8;	// голубой - 8
			mas[5][8].index = 8;
			mas[10][7].style.background = col8;	// голубой - 8
			mas[10][7].index = 8;
			mas[4][11].style.background = col9;	// синий - 9
			mas[4][11].index = 9;
			mas[11][4].style.background = col9;	// синий - 9
			mas[11][4].index = 9;
			mas[6][9].style.background = col10;	// светло-серый - 10
			mas[6][9].index = 10;
			mas[9][6].style.background = col10;	// светло-серый - 10
			mas[9][6].index = 10;
			mas[8][5].style.background = col11;	// сиреневый - 11
			mas[8][5].index = 11;
			mas[7][10].style.background = col11;	// сиреневый - 11
			mas[7][10].index = 11;
			
			if (w == 1)
			{
				for (var i = 0; i < tileX; i++)
				{
					for (var j = 0; j < tileY; j++)
					{
						masF[j][i].style.background = mas[j][i].style.background;
						masF[j][i].index = mas[j][i].index;
						masInF[j][i].style.background = mas[j][i].style.background;
						masInF[j][i].index = mas[j][i].index;
					}
				}
				return;
			}
			
			for (var i = 0; i < tileX; i++)
			{
				for (var j = 0; j < tileY; j++)
				{
					if (masF[j][i].index < 14)
					{
						masF[j][i].style.background = mas[j][i].style.background;
					}
				}
			}
		}
		
		function deskFig()
		{
			// черные и белые пешки
			for (var i = 4; i < tileX - 4; i++)
			{
				if (mas[i][1].index == 12)
				{
					masF[i][1].style.background = "no-repeat url(images/f1-1.png)";
					masF[i][1].index = 1012;
				}
				else
				{
					masF[i][1].style.background = "no-repeat url(images/f1-1.png)";
					masF[i][1].index = 1012;
				}
				if (mas[i][14].index == 12)
				{
					masF[i][14].style.background = "no-repeat url(images/f1-0.png)";
					masF[i][14].index = 1001;
				}
				else
				{
					masF[i][14].style.background = "no-repeat url(images/f1-0.png)";
					masF[i][14].index = 1001;
				}
			}
			
			// черные и белые ладьи
			masF[4][0].style.background = "no-repeat url(images/f2-1.png)";
			masF[4][0].index = 2012;
			masF[11][0].style.background = "no-repeat url(images/f2-1.png)";
			masF[11][0].index = 2012;
			masF[4][15].style.background = "no-repeat url(images/f2-0.png)";
			masF[4][15].index = 2001;
			masF[11][15].style.background = "no-repeat url(images/f2-0.png)";
			masF[11][15].index = 2001;
			// черные и белые кони
			masF[5][0].style.background = "no-repeat url(images/f3-1.png)";
			masF[5][0].index = 3012;
			masF[10][0].style.background = "no-repeat url(images/f3-1.png)";
			masF[10][0].index = 3012;
			masF[5][15].style.background = "no-repeat url(images/f3-0.png)";
			masF[5][15].index = 3001;
			masF[10][15].style.background = "no-repeat url(images/f3-0.png)";
			masF[10][15].index = 3001;
			// черные и белые слоны
			masF[6][0].style.background = "no-repeat url(images/f4-1.png)";
			masF[6][0].index = 4012;
			masF[9][0].style.background = "no-repeat url(images/f4-1.png)";
			masF[9][0].index = 4012;
			masF[6][15].style.background = "no-repeat url(images/f4-0.png)";
			masF[6][15].index = 4001;
			masF[9][15].style.background = "no-repeat url(images/f4-0.png)";
			masF[9][15].index = 4001;
			// черная и белая королевы
			masF[7][0].style.background = "no-repeat url(images/f5-1.png)";
			masF[7][0].index = 5012;
			masF[7][15].style.background = "no-repeat url(images/f5-0.png)";
			masF[7][15].index = 5001;
			// черный и белый короли
			masF[8][0].style.background = "no-repeat url(images/f6-1.png)";
			masF[8][0].index = 6012;
			masF[8][15].style.background = "no-repeat url(images/f6-0.png)";
			masF[8][15].index = 6001;
			
			// розовые фигуры
			masF[2][14].style.background = "no-repeat url(images/f1-2.png)";
			masF[2][14].index = 1020;
			masF[3][14].style.background = "no-repeat url(images/f1-2.png)";
			masF[3][14].index = 1020;
			masF[2][15].style.background = "no-repeat url(images/f2-2.png)";
			masF[2][15].index = 2020;
			masF[3][15].style.background = "no-repeat url(images/f3-2.png)";
			masF[3][15].index = 3020;
			
			masF[14][6].style.background = "no-repeat url(images/f1-2.png)";
			masF[14][6].index = 1020;
			masF[15][6].style.background = "no-repeat url(images/f4-2.png)";
			masF[15][6].index = 4020;
			masF[14][7].style.background = "no-repeat url(images/f1-2.png)";
			masF[14][7].index = 1020;
			masF[15][7].style.background = "no-repeat url(images/f5-2.png)";
			masF[15][7].index = 5020;
			
			
			// темно-серые фигуры
			masF[0][14].style.background = "no-repeat url(images/f2-3.png)";
			masF[0][14].index = 2030;
			masF[1][14].style.background = "no-repeat url(images/f3-3.png)";
			masF[1][14].index = 3030;
			masF[0][15].style.background = "no-repeat url(images/f5-3.png)";
			masF[0][15].index = 5030;
			masF[1][15].style.background = "no-repeat url(images/f4-3.png)";
			masF[1][15].index = 4030;
			
			masF[14][0].style.background = "no-repeat url(images/f4-3.png)";
			masF[14][0].index = 4030;
			masF[15][0].style.background = "no-repeat url(images/f5-3.png)";
			masF[15][0].index = 5030;
			masF[14][1].style.background = "no-repeat url(images/f3-3.png)";
			masF[14][1].index = 3030;
			masF[15][1].style.background = "no-repeat url(images/f2-3.png)";
			masF[15][1].index = 2030;
			
			
			// красные фигуры
			masF[0][12].style.background = "no-repeat url(images/f5-4.png)";
			masF[0][12].index = 5040;
			masF[1][12].style.background = "no-repeat url(images/f1-4.png)";
			masF[1][12].index = 1040;
			masF[0][13].style.background = "no-repeat url(images/f4-4.png)";
			masF[0][13].index = 4040;
			masF[1][13].style.background = "no-repeat url(images/f1-4.png)";
			masF[1][13].index = 1040;
			
			masF[14][4].style.background = "no-repeat url(images/f1-4.png)";
			masF[14][4].index = 1040;
			masF[15][4].style.background = "no-repeat url(images/f2-4.png)";
			masF[15][4].index = 2040;
			masF[14][5].style.background = "no-repeat url(images/f1-4.png)";
			masF[14][5].index = 1040;
			masF[15][5].style.background = "no-repeat url(images/f3-4.png)";
			masF[15][5].index = 3040;
			
			
			// оранжевые фигуры
			masF[0][10].style.background = "no-repeat url(images/f3-5.png)";
			masF[0][10].index = 3050;
			masF[1][10].style.background = "no-repeat url(images/f1-5.png)";
			masF[1][10].index = 1050;
			masF[0][11].style.background = "no-repeat url(images/f2-5.png)";
			masF[0][11].index = 2050;
			masF[1][11].style.background = "no-repeat url(images/f1-5.png)";
			masF[1][11].index = 1050;
			
			masF[14][2].style.background = "no-repeat url(images/f1-5.png)";
			masF[14][2].index = 1050;
			masF[15][2].style.background = "no-repeat url(images/f4-5.png)";
			masF[15][2].index = 4050;
			masF[14][3].style.background = "no-repeat url(images/f1-5.png)";
			masF[14][3].index = 1050;
			masF[15][3].style.background = "no-repeat url(images/f5-5.png)";
			masF[15][3].index = 5050;
			
			
			// желтые фигуры
			masF[0][8].style.background = "no-repeat url(images/f5-6.png)";
			masF[0][8].index = 5060;
			masF[1][8].style.background = "no-repeat url(images/f1-6.png)";
			masF[1][8].index = 1060;
			masF[0][9].style.background = "no-repeat url(images/f4-6.png)";
			masF[0][9].index = 4060;
			masF[1][9].style.background = "no-repeat url(images/f1-6.png)";
			masF[1][9].index = 1060;
			
			masF[12][0].style.background = "no-repeat url(images/f3-6.png)";
			masF[12][0].index = 3060;
			masF[13][0].style.background = "no-repeat url(images/f2-6.png)";
			masF[13][0].index = 2060;
			masF[12][1].style.background = "no-repeat url(images/f1-6.png)";
			masF[12][1].index = 1060;
			masF[13][1].style.background = "no-repeat url(images/f1-6.png)";
			masF[13][1].index = 1060;
			
			
			// зеленые фигуры
			masF[0][6].style.background = "no-repeat url(images/f4-7.png)";
			masF[0][6].index = 4070;
			masF[1][6].style.background = "no-repeat url(images/f1-7.png)";
			masF[1][6].index = 1070;
			masF[0][7].style.background = "no-repeat url(images/f5-7.png)";
			masF[0][7].index = 5070;
			masF[1][7].style.background = "no-repeat url(images/f1-7.png)";
			masF[1][7].index = 1070;
			
			masF[12][14].style.background = "no-repeat url(images/f1-7.png)";
			masF[12][14].index = 1070;
			masF[13][14].style.background = "no-repeat url(images/f1-7.png)";
			masF[13][14].index = 1070;
			masF[12][15].style.background = "no-repeat url(images/f3-7.png)";
			masF[12][15].index = 3070;
			masF[13][15].style.background = "no-repeat url(images/f2-7.png)";
			masF[13][15].index = 2070;
			
			
			// голубые фигуры
			masF[0][4].style.background = "no-repeat url(images/f2-8.png)";
			masF[0][4].index = 2080;
			masF[1][4].style.background = "no-repeat url(images/f1-8.png)";
			masF[1][4].index = 1080;
			masF[0][5].style.background = "no-repeat url(images/f3-8.png)";
			masF[0][5].index = 3080;
			masF[1][5].style.background = "no-repeat url(images/f1-8.png)";
			masF[1][5].index = 1080;
			
			masF[14][12].style.background = "no-repeat url(images/f1-8.png)";
			masF[14][12].index = 1080;
			masF[15][12].style.background = "no-repeat url(images/f5-8.png)";
			masF[15][12].index = 5080;
			masF[14][13].style.background = "no-repeat url(images/f1-8.png)";
			masF[14][13].index = 1080;
			masF[15][13].style.background = "no-repeat url(images/f4-8.png)";
			masF[15][13].index = 4080;
			
			
			// синие фигуры
			masF[0][2].style.background = "no-repeat url(images/f4-9.png)";
			masF[0][2].index = 4090;
			masF[1][2].style.background = "no-repeat url(images/f1-9.png)";
			masF[1][2].index = 1090;
			masF[0][3].style.background = "no-repeat url(images/f5-9.png)";
			masF[0][3].index = 5090;
			masF[1][3].style.background = "no-repeat url(images/f1-9.png)";
			masF[1][3].index = 1090;
			
			masF[14][10].style.background = "no-repeat url(images/f1-9.png)";
			masF[14][10].index = 1090;
			masF[15][10].style.background = "no-repeat url(images/f3-9.png)";
			masF[15][10].index = 3090;
			masF[14][11].style.background = "no-repeat url(images/f1-9.png)";
			masF[14][11].index = 1090;
			masF[15][11].style.background = "no-repeat url(images/f2-9.png)";
			masF[15][11].index = 2090;
			
			
			// светло-серые фигуры
			masF[0][0].style.background = "no-repeat url(images/f5-10.png)";
			masF[0][0].index = 5100;
			masF[1][0].style.background = "no-repeat url(images/f4-10.png)";
			masF[1][0].index = 4100;
			masF[0][1].style.background = "no-repeat url(images/f2-10.png)";
			masF[0][1].index = 2100;
			masF[1][1].style.background = "no-repeat url(images/f3-10.png)";
			masF[1][1].index = 3100;
			
			masF[14][14].style.background = "no-repeat url(images/f3-10.png)";
			masF[14][14].index = 3100;
			masF[15][14].style.background = "no-repeat url(images/f2-10.png)";
			masF[15][14].index = 2100;
			masF[14][15].style.background = "no-repeat url(images/f4-10.png)";
			masF[14][15].index = 4100;
			masF[15][15].style.background = "no-repeat url(images/f5-10.png)";
			masF[15][15].index = 5100;
			
			
			// сиреневые фигуры
			masF[2][0].style.background = "no-repeat url(images/f2-11.png)";
			masF[2][0].index = 2110;
			masF[3][0].style.background = "no-repeat url(images/f3-11.png)";
			masF[3][0].index = 3110;
			masF[2][1].style.background = "no-repeat url(images/f1-11.png)";
			masF[2][1].index = 1110;
			masF[3][1].style.background = "no-repeat url(images/f1-11.png)";
			masF[3][1].index = 1110;
			
			masF[14][8].style.background = "no-repeat url(images/f1-11.png)";
			masF[14][8].index = 1110;
			masF[15][8].style.background = "no-repeat url(images/f5-11.png)";
			masF[15][8].index = 5110;
			masF[14][9].style.background = "no-repeat url(images/f1-11.png)";
			masF[14][9].index = 1110;
			masF[15][9].style.background = "no-repeat url(images/f4-11.png)";
			masF[15][9].index = 4110;
			
		}




