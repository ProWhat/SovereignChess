




		
		
		
		var masTempF = new Array(100);		// ������ �����
		var numMT = 0;				// ���������� ��� ����������� ���-�� �����
		
		var masTempH;				// ������ �����
		
		
		
		
		function figMoves(numFig)		// ������� ������������ ��������� ����
		{
			var elem = document.getElementById(numFig);
			
			var tile = elem.children[1].index;
			var strD = "" + tile;
			
			elem.name = 1; 			// �������� ���� ������� �� ����
			
			// ����� ���� ������ ������� ������ � �������� � ����������� � ����
			var str = "" + tile;
			var figNum = str[0];
			var figCol = str[1] + str[2];
			var figCtr = str[3];
			
			var tX = 0;
			var tY = 0;
			
			for (var i = 0; i < tileY; i++)			// ���������� ���������� ������ (���)
			{
				for (var j = 0; j < tileX; j++)
				{
					if (mas[j][i] == elem)
					{
						tX = j;
						tY = i;
					}
				}
			}
			
			db7.innerText = tX + "/" + tY;					// !!! DEBUG !!!
			
			var col = 1;				// ���������� ��� ����������� ������� ����� � ������ �� � ������
			
			if (figNum == 1)	// �����				// ����������� ��������� ������ 	!!!!!!!!!!!!!!!!
			{
				if (tY > 8)
				{
					if (masF[tX][tY - 1].index < 14)
					{
						if (figCol != mas[tX][tY - 1].index && masCon[mas[tX][tY - 1].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX][tY - 1];
						}
					}
					if (masF[tX][tY - 1].index < 14 && masF[tX][tY - 2].index < 14 && tY == 14)
					{
						masTempH[wFig][col++] = mas[tX][tY - 2];
					}
					if (masF[tX - 1][tY - 1].index > 14)
					{
						if (figCol != mas[tX - 1][tY - 1].index && ("" + masF[tX - 1][tY - 1].index)[3] != nowH && ("" + masF[tX - 1][tY - 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX - 1][tY - 1];	// kill	***
						}
					}
					if (masF[tX + 1][tY - 1].index > 14)
					{
						if (figCol != mas[tX + 1][tY - 1].index && ("" + masF[tX + 1][tY - 1].index)[3] != nowH && ("" + masF[tX + 1][tY - 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX + 1][tY - 1];	// kill ***
						}
					}
				}
				if (tY < 7)
				{
					if (masF[tX][tY + 1].index < 14)
					{
						if (figCol != mas[tX][tY + 1].index && masCon[mas[tX][tY + 1].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX][tY + 1];
						}
					}
					if (masF[tX][tY + 1].index < 14 && masF[tX][tY + 2].index < 14 && tY == 1)
					{
						masTempH[wFig][col++] = mas[tX][tY + 2];
					}
					if (masF[tX - 1][tY + 1].index > 14)
					{
						if (figCol != mas[tX - 1][tY + 1].index && ("" + masF[tX - 1][tY + 1].index)[3] != nowH && ("" + masF[tX - 1][tY + 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX - 1][tY + 1];	// kill ***
						}
					}
					if (masF[tX + 1][tY + 1].index > 14)
					{
						if (figCol != mas[tX + 1][tY + 1].index && ("" + masF[tX + 1][tY + 1].index)[3] != nowH && ("" + masF[tX + 1][tY + 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX + 1][tY + 1];	// kill ***
						}
					}
				}
				if (tX > 8)
				{
					if (masF[tX - 1][tY].index < 14)
					{
						if (figCol != mas[tX - 1][tY].index && masCon[mas[tX - 1][tY].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX - 1][tY];
						}
					}
					if (masF[tX - 1][tY].index < 14 && masF[tX - 2][tY].index < 14 && tX == 14)
					{
						masTempH[wFig][col++] = mas[tX - 2][tY];
					}
					if (masF[tX - 1][tY - 1].index > 14)
					{
						if (figCol != mas[tX - 1][tY - 1].index && ("" + masF[tX - 1][tY - 1].index)[3] != nowH && ("" + masF[tX - 1][tY - 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX - 1][tY - 1];	// kill ***
						}
					}
					if (masF[tX - 1][tY + 1].index > 14)
					{
						if (figCol != mas[tX - 1][tY + 1].index && ("" + masF[tX - 1][tY + 1].index)[3] != nowH && ("" + masF[tX - 1][tY + 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX - 1][tY + 1];	// kill ***
						}
					}
				}
				if (tX < 7)
				{
					if (masF[tX + 1][tY].index < 14)
					{
						if (figCol != mas[tX + 1][tY].index && masCon[mas[tX + 1][tY].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX + 1][tY];
						}
					}
					if (masF[tX + 1][tY].index < 14 && masF[tX + 2][tY].index < 14 && tX == 1)
					{
						masTempH[wFig][col++] = mas[tX + 2][tY];
					}
					if (masF[tX + 1][tY - 1].index > 14)
					{
						if (figCol != mas[tX + 1][tY - 1].index && ("" + masF[tX + 1][tY - 1].index)[3] != nowH && ("" + masF[tX + 1][tY - 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX + 1][tY - 1];	// kill ***
						}
					}
					if (masF[tX + 1][tY + 1].index > 14)
					{
						if (figCol != mas[tX + 1][tY + 1].index && ("" + masF[tX + 1][tY + 1].index)[3] != nowH && ("" + masF[tX + 1][tY + 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX + 1][tY + 1];	// kill ***
						}
					}
				}
			}
			else if (figNum == 2)	// �����
			{
				for (var i = tX + 1; i < tX + 9 && i < tileX; i++)
				{
					if (masF[i][tY].index < 14)
					{
						if (figCol != mas[i][tY].index && masCon[mas[i][tY].index] == 0)
						{
							masTempH[wFig][col++] = mas[i][tY];
						}
					}
					else
					{
						if (figCol != mas[i][tY].index && ("" + masF[i][tY].index)[3] != nowH && ("" + masF[i][tY].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[i][tY];	// kill ***
						}
						break;
					}
				}
				for (var i = tX - 1; i > tX - 9 && i >= 0; i--)
				{
					if (masF[i][tY].index < 14)
					{
						if (figCol != mas[i][tY].index && masCon[mas[i][tY].index] == 0)
						{
							masTempH[wFig][col++] = mas[i][tY];
						}
					}
					else
					{
						if (figCol != mas[i][tY].index && ("" + masF[i][tY].index)[3] != nowH && ("" + masF[i][tY].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[i][tY];	// kill ***
						}
						break;
					}
				}
				for (var i = tY + 1; i < tY + 9 && i < tileY; i++)
				{
					if (masF[tX][i].index < 14)
					{
						if (figCol != mas[tX][i].index && masCon[mas[tX][i].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX][i];
						}
					}
					else
					{
						if (figCol != mas[tX][i].index && ("" + masF[tX][i].index)[3] != nowH && ("" + masF[tX][i].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX][i];	// kill ***
						}
						break;
					}
				}
				for (var i = tY - 1; i > tY - 9 && i >= 0; i--)
				{
					if (masF[tX][i].index < 14)
					{
						if (figCol != mas[tX][i].index && masCon[mas[tX][i].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX][i];
						}
					}
					else
					{
						if (figCol != mas[tX][i].index && ("" + masF[tX][i].index)[3] != nowH && ("" + masF[tX][i].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX][i];	// kill ***
						}
						break;
					}
				}
			}
			else if (figNum == 3)	// ����
			{
				if (tX - 1 >= 0 && tY - 2 >= 0)
				{
					if (masF[tX - 1][tY - 2].index < 14)
					{
						if (figCol != mas[tX - 1][tY - 2].index && masCon[mas[tX - 1][tY - 2].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX - 1][tY - 2];
						}
					}
					else
					{
						if (figCol != mas[tX - 1][tY - 2].index && ("" + masF[tX - 1][tY - 2].index)[3] != nowH && ("" + masF[tX - 1][tY - 2].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX - 1][tY - 2];	// kill ***
						}
					}
				}
				if (tX + 1 < tileX && tY - 2 >= 0)
				{
					if (masF[tX + 1][tY - 2].index < 14)
					{
						if (figCol != mas[tX + 1][tY - 2].index && masCon[mas[tX + 1][tY - 2].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX + 1][tY - 2];
						}
					}
					else
					{
						if (figCol != mas[tX + 1][tY - 2].index && ("" + masF[tX + 1][tY - 2].index)[3] != nowH && ("" + masF[tX + 1][tY - 2].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX + 1][tY - 2];	// kill ***
						}
					}
				}
				if (tX - 1 >= 0 && tY + 2 < tileY)
				{
					if (masF[tX - 1][tY + 2].index < 14)
					{
						if (figCol != mas[tX - 1][tY + 2].index && masCon[mas[tX - 1][tY + 2].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX - 1][tY + 2];
						}
					}
					else
					{
						if (figCol != mas[tX - 1][tY + 2].index && ("" + masF[tX - 1][tY + 2].index)[3] != nowH && ("" + masF[tX - 1][tY + 2].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX - 1][tY + 2];	// kill ***
						}
					}
				}
				if (tX + 1 < tileX && tY + 2 < tileY)
				{
					if (masF[tX + 1][tY + 2].index < 14)
					{
						if (figCol != mas[tX + 1][tY + 2].index && masCon[mas[tX + 1][tY + 2].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX + 1][tY + 2];
						}
					}
					else
					{
						if (figCol != mas[tX + 1][tY + 2].index && ("" + masF[tX + 1][tY + 2].index)[3] != nowH && ("" + masF[tX + 1][tY + 2].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX + 1][tY + 2];	// kill ***
						}
					}
				}
				if (tX + 2 < tileX && tY + 1 < tileY)
				{
					if (masF[tX + 2][tY + 1].index < 14)
					{
						if (figCol != mas[tX + 2][tY + 1].index && masCon[mas[tX + 2][tY + 1].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX + 2][tY + 1];
						}
					}
					else
					{
						if (figCol != mas[tX + 2][tY + 1].index && ("" + masF[tX + 2][tY + 1].index)[3] != nowH && ("" + masF[tX + 2][tY + 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX + 2][tY + 1];	// kill ***
						}
					}
				}
				if (tX + 2 < tileX && tY - 1 >= 0)
				{
					if (masF[tX + 2][tY - 1].index < 14)
					{
						if (figCol != mas[tX + 2][tY - 1].index && masCon[mas[tX + 2][tY - 1].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX + 2][tY - 1];
						}
					}
					else
					{
						if (figCol != mas[tX + 2][tY - 1].index && ("" + masF[tX + 2][tY - 1].index)[3] != nowH && ("" + masF[tX + 2][tY - 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX + 2][tY - 1];	// kill ***
						}
					}
				}
				if (tX - 2 >= 0 && tY + 1 < tileY)
				{
					if (masF[tX - 2][tY + 1].index < 14)
					{
						if (figCol != mas[tX - 2][tY + 1].index && masCon[mas[tX - 2][tY + 1].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX - 2][tY + 1];
						}
					}
					else
					{
						if (figCol != mas[tX - 2][tY + 1].index && ("" + masF[tX - 2][tY + 1].index)[3] != nowH && ("" + masF[tX - 2][tY + 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX - 2][tY + 1];	// kill ***
						}
					}
				}
				if (tX - 2 >= 0 && tY - 1 >= 0)
				{
					if (masF[tX - 2][tY - 1].index < 14)
					{
						if (figCol != mas[tX - 2][tY - 1].index && masCon[mas[tX - 2][tY - 1].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX - 2][tY - 1];
						}
					}
					else
					{
						if (figCol != mas[tX - 2][tY - 1].index && ("" + masF[tX - 2][tY - 1].index)[3] != nowH && ("" + masF[tX - 2][tY - 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX - 2][tY - 1];	// kill ***
						}
					}
				}
			}
			else if (figNum == 4)	// ����
			{
				for (var i = tX + 1, j = tY + 1; i < tileX && j < tileY && i < tX + 9 && j < tY + 9; i++, j++)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && masCon[mas[i][j].index] == 0)
						{
							masTempH[wFig][col++] = mas[i][j];
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[i][j];	// kill ***
						}
						break;
					}
				}
				for (var i = tX - 1, j = tY - 1; i >= 0 && j >= 0 && i > tX - 9 && j > tY - 9; i--, j--)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && masCon[mas[i][j].index] == 0)
						{
							masTempH[wFig][col++] = mas[i][j];
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[i][j];	// kill ***
						}
						break;
					}
				}
				for (var i = tX + 1, j = tY - 1; i < tileX && j >= 0 && i < tX + 9 && j > tY - 9; i++, j--)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && masCon[mas[i][j].index] == 0)
						{
							masTempH[wFig][col++] = mas[i][j];
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[i][j];	// kill ***
						}
						break;
					}
				}
				for (var i = tX - 1, j = tY + 1; i >= 0 && j < tileY && i > tX - 9 && j < tY + 9; i--, j++)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && masCon[mas[i][j].index] == 0)
						{
							masTempH[wFig][col++] = mas[i][j];
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[i][j];	// kill ***
						}
						break;
					}
				}
			}
			else if (figNum == 5)	// ��������
			{
				for (var i = tX + 1; i < tX + 9 && i < tileX; i++)
				{
					if (masF[i][tY].index < 14)
					{
						if (figCol != mas[i][tY].index && masCon[mas[i][tY].index] == 0)
						{
							masTempH[wFig][col++] = mas[i][tY];
						}
					}
					else
					{
						if (figCol != mas[i][tY].index && ("" + masF[i][tY].index)[3] != nowH && ("" + masF[i][tY].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[i][tY];	// kill ***
						}
						break;
					}
				}
				for (var i = tX - 1; i > tX - 9 && i >= 0; i--)
				{
					if (masF[i][tY].index < 14)
					{
						if (figCol != mas[i][tY].index && masCon[mas[i][tY].index] == 0)
						{
							masTempH[wFig][col++] = mas[i][tY];
						}
					}
					else
					{
						if (figCol != mas[i][tY].index && ("" + masF[i][tY].index)[3] != nowH && ("" + masF[i][tY].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[i][tY];	// kill ***
						}
						break;
					}
				}
				for (var i = tY + 1; i < tY + 9 && i < tileY; i++)
				{
					if (masF[tX][i].index < 14)
					{
						if (figCol != mas[tX][i].index && masCon[mas[tX][i].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX][i];
						}
					}
					else
					{
						if (figCol != mas[tX][i].index && ("" + masF[tX][i].index)[3] != nowH && ("" + masF[tX][i].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX][i];	// kill ***
						}
						break;
					}
				}
				for (var i = tY - 1; i > tY - 9 && i >= 0; i--)
				{
					if (masF[tX][i].index < 14)
					{
						if (figCol != mas[tX][i].index && masCon[mas[tX][i].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX][i];
						}
					}
					else
					{
						if (figCol != mas[tX][i].index && ("" + masF[tX][i].index)[3] != nowH && ("" + masF[tX][i].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX][i];	// kill ***
						}
						break;
					}
				}
				for (var i = tX + 1, j = tY + 1; i < tileX && j < tileY && i < tX + 9 && j < tY + 9; i++, j++)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && masCon[mas[i][j].index] == 0)
						{
							masTempH[wFig][col++] = mas[i][j];
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[i][j];	// kill ***
						}
						break;
					}
				}
				for (var i = tX - 1, j = tY - 1; i >= 0 && j >= 0 && i > tX - 9 && j > tY - 9; i--, j--)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && masCon[mas[i][j].index] == 0)
						{
							masTempH[wFig][col++] = mas[i][j];
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[i][j];	// kill ***
						}
						break;
					}
				}
				for (var i = tX + 1, j = tY - 1; i < tileX && j >= 0 && i < tX + 9 && j > tY - 9; i++, j--)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && masCon[mas[i][j].index] == 0)
						{
							masTempH[wFig][col++] = mas[i][j];
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[i][j];	// kill ***
						}
						break;
					}
				}
				for (var i = tX - 1, j = tY + 1; i >= 0 && j < tileY && i > tX - 9 && j < tY + 9; i--, j++)
				{
					if (masF[i][j].index < 14)
					{
						if (figCol != mas[i][j].index && masCon[mas[i][j].index] == 0)
						{
							masTempH[wFig][col++] = mas[i][j];
						}
					}
					else
					{
						if (figCol != mas[i][j].index && ("" + masF[i][j].index)[3] != nowH && ("" + masF[i][j].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[i][j];	// kill ***
						}
						break;
					}
				}
			}
			else if (figNum == 6)	// ������
			{
				if (tX - 1 >= 0 && tY - 1 >= 0)
				{
					if (masF[tX - 1][tY - 1].index < 14)
					{
						if (figCol != mas[tX - 1][tY - 1].index && masCon[mas[tX - 1][tY - 1].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX - 1][tY - 1];
						}
					}
					else
					{
						if (figCol != mas[tX - 1][tY - 1].index && ("" + masF[tX - 1][tY - 1].index)[3] != nowH && ("" + masF[tX - 1][tY - 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX - 1][tY - 1];	// kill ***
						}
					}
				}
				if (tY - 1 >= 0)
				{
					if (masF[tX][tY - 1].index < 14)
					{
						if (figCol != mas[tX][tY - 1].index && masCon[mas[tX][tY - 1].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX][tY - 1];
						}
					}
					else
					{
						if (figCol != mas[tX][tY - 1].index && ("" + masF[tX][tY - 1].index)[3] != nowH && ("" + masF[tX][tY - 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX][tY - 1];	// kill ***
						}
					}
				}
				if (tX + 1 < tileX && tY - 1 >= 0)
				{
					if (masF[tX + 1][tY - 1].index < 14)
					{
						if (figCol != mas[tX + 1][tY - 1].index && masCon[mas[tX + 1][tY - 1].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX + 1][tY - 1];
						}
					}
					else
					{
						if (figCol != mas[tX + 1][tY - 1].index && ("" + masF[tX + 1][tY - 1].index)[3] != nowH && ("" + masF[tX + 1][tY - 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX + 1][tY - 1];	// kill ***
						}
					}
				}
				if (tX + 1 < tileX)
				{
					if (masF[tX + 1][tY].index < 14)
					{
						if (figCol != mas[tX + 1][tY].index && masCon[mas[tX + 1][tY].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX + 1][tY];
						}
					}
					else
					{
						if (figCol != mas[tX + 1][tY].index && ("" + masF[tX + 1][tY].index)[3] != nowH && ("" + masF[tX + 1][tY].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX + 1][tY];	// kill ***
						}
					}
				}
				if (tX + 1 < tileX && tY + 1 < tileY)
				{
					if (masF[tX + 1][tY + 1].index < 14)
					{
						if (figCol != mas[tX + 1][tY + 1].index && masCon[mas[tX + 1][tY + 1].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX + 1][tY + 1];
						}
					}
					else
					{
						if (figCol != mas[tX + 1][tY + 1].index && ("" + masF[tX + 1][tY + 1].index)[3] != nowH && ("" + masF[tX + 1][tY + 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX + 1][tY + 1];	// kill ***
						}
					}
				}
				if (tY + 1 < tileY)
				{
					if (masF[tX][tY + 1].index < 14)
					{
						if (figCol != mas[tX][tY + 1].index && masCon[mas[tX][tY + 1].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX][tY + 1];
						}
					}
					else
					{
						if (figCol != mas[tX][tY + 1].index && ("" + masF[tX][tY + 1].index)[3] != nowH && ("" + masF[tX][tY + 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX][tY + 1];	// kill ***
						}
					}
				}
				if (tX - 1 >= 0 && tY + 1 < tileY)
				{
					if (masF[tX - 1][tY + 1].index < 14)
					{
						if (figCol != mas[tX - 1][tY + 1].index && masCon[mas[tX - 1][tY + 1].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX - 1][tY + 1];
						}
					}
					else
					{
						if (figCol != mas[tX - 1][tY + 1].index && ("" + masF[tX - 1][tY + 1].index)[3] != nowH && ("" + masF[tX - 1][tY + 1].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX - 1][tY + 1];	// kill ***
						}
					}
				}
				if (tX - 1 >= 0)
				{
					if (masF[tX - 1][tY].index < 14)
					{
						if (figCol != mas[tX - 1][tY].index && masCon[mas[tX - 1][tY].index] == 0)
						{
							masTempH[wFig][col++] = mas[tX - 1][tY];
						}
					}
					else
					{
						if (figCol != mas[tX - 1][tY].index && ("" + masF[tX - 1][tY].index)[3] != nowH && ("" + masF[tX - 1][tY].index)[3] != 0)
						{
							masTempH[wFig][col++] = mas[tX - 1][tY];	// kill ***
						}
					}
				}
			}
			
			if (col > 1)	// ���� ������ ����� ������, ��������� �� � ������
			{
				masTempH[wFig][0] = elem;
				wFig++;
			}
		}
		
		var wFig = 0;
		
		function clickBut(idB)	// ������� ����������� ������ ��
		{
			if (nowH != 2)		// ������� ����������� ���� ��� ��
				return;
			return;
			var slow = 0;			// ���������� ��� ����������� �������������� ***DEBUG***
			
			
			var numMT = 0;
			masTempF = new Array(100);	// ������ ������ �����
			
			for (var i = 0; i < tileX; i++)			// ���������� ������ �������������� ��, � ��������� �� � ������
			{
				for (var j = 0; j < tileY; j++)
				{
					var str = "" + masF[j][i].index;
					
					if(str[3] == 2)
					{
						masTempF[numMT++] = mas[j][i];
					}
					
					slow++;	// ***************************************** ***DEBUG***
				}
			}
			
			
			
			masTempH = new Array(numMT);		// ������ ����� (������)
			
			for (i = 0; i < masTempH.length; i++)
			{
				masTempH[i] = new Array(100);
				slow++;	// ***************************************** ***DEBUG***
			}
			
			
			
			wFig = 0;
			
			for (var n = 0; n < numMT; n++)			// �������� �� ������� ����� ��, � ���������� ��������� ����
			{
				figMoves(masTempF[n].id);		// �������� �� ������ ��� ����������� ��������� �����
				slow++;	// ***************************************** ***DEBUG***
			}
			
			
			
			var figRand = maxRand(wFig);		// �������� ��������� ������ ��� ����
			clickT(masTempH[figRand][0].id);	// ���������� ������� �� ���
			
			
			
			var masLen = 0;
			
			for(var i = 1; i < masTempH[figRand].length; i++)	// ���������� ���-�� ��������� �����
			{
				if (masTempH[figRand][i] == null)
				{
					masLen = i - 1;
					break;
				}
				slow++;	// ***************************************** ***DEBUG***
			}
			
			var hodRand = maxRand(masLen) + 1;	// �������� ��������� ��� ��� ������� ������
			clickT(masTempH[figRand][hodRand].id);	// ���������� ������� �� ������ ��� ����
			
			db8.innerText = "slow: " + slow;	// ***************************************** ***DEBUG***
		}
		
		
		



