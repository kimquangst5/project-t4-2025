#include<iostream>
void xuat(){ 
int n; std::cin>>n;
int k=0;
for(int i=n;i>=0;i--){
	for(int j=0;j<n-i-1;j++){
		std::cout<<" ";
}
	for(k=i;k<2*i+1;k++){
		std::cout<<"*";
	}
	for(k=0;k<i-1;k++){
		std::cout<<"*";
	}
std::cout<<std::endl;
}
}

int main(){
	xuat();
}